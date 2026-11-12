const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Email templates
const templates = {
  magicLink: (orgName, token, loginUrl) => ({
    subject: "Your AvCon Aviation Pathway Portal Login Link",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0e7c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">AvCon Aviation Pathway Portal</h1>
        </div>
        <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #061b2d; font-size: 16px;">Hello <strong>${orgName}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6;">
            Click the button below to log in to your dashboard and manage your opportunities:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}?token=${token}" 
               style="background: #0e7c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              Login to Dashboard
            </a>
          </div>
          <p style="color: #4a5568; font-size: 14px;">
            Or paste this link in your browser:<br>
            <code style="background: white; padding: 8px; display: inline-block; border-radius: 4px; margin-top: 8px;">
              ${loginUrl}?token=${token}
            </code>
          </p>
          <hr style="border: none; border-top: 1px solid #e0e6ed; margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            This link expires in 24 hours. If you didn't request this link, you can safely ignore this email.
          </p>
        </div>
      </div>
    `
  }),

  listingApproved: (orgName, listingTitle, directoryUrl) => ({
    subject: `Your Listing "${listingTitle}" Has Been Approved! 🎉`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0e7c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">✓ Listing Approved</h1>
        </div>
        <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #061b2d; font-size: 16px;">Hi <strong>${orgName}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6;">
            Great news! Your listing <strong>"${listingTitle}"</strong> has been approved by our team and is now live in the AvCon Aviation Pathway Portal.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${directoryUrl}" 
               style="background: #0e7c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              View in Directory
            </a>
          </div>
          <p style="color: #4a5568; line-height: 1.6;">
            Students and professionals across aviation and aerospace can now see and apply for your opportunity. 
            You can manage your listing anytime from your dashboard.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e6ed; margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Questions? Contact us at support@avcon.ie
          </p>
        </div>
      </div>
    `
  }),

  listingRejected: (orgName, listingTitle, reason) => ({
    subject: `Feedback on Your Listing "${listingTitle}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #c53030; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Listing Under Review</h1>
        </div>
        <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #061b2d; font-size: 16px;">Hi <strong>${orgName}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6;">
            Thank you for submitting <strong>"${listingTitle}"</strong>. Our team has reviewed your listing and has some feedback:
          </p>
          <div style="background: white; border-left: 4px solid #c53030; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #061b2d; margin: 0; line-height: 1.6;">${reason}</p>
          </div>
          <p style="color: #4a5568; line-height: 1.6;">
            Please update your listing with the suggested changes and resubmit. You can edit your draft from your dashboard anytime.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e6ed; margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Questions? Contact us at support@avcon.ie
          </p>
        </div>
      </div>
    `
  }),

  expiryReminder: (orgName, listingTitle, expiryDate) => ({
    subject: `Reminder: Your Listing Expires Soon`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ed8936; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">⏰ Listing Expires Soon</h1>
        </div>
        <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #061b2d; font-size: 16px;">Hi <strong>${orgName}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6;">
            Your listing <strong>"${listingTitle}"</strong> is set to expire on <strong>${expiryDate}</strong>.
          </p>
          <p style="color: #4a5568; line-height: 1.6;">
            If you'd like to keep this opportunity active, simply log in to your dashboard and renew it. You can extend the expiry date or make any other updates.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://avcon.ie/portal" 
               style="background: #0e7c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              Log In to Dashboard
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #e0e6ed; margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            If you don't renew by the expiry date, your listing will be archived but can be restored anytime from your dashboard.
          </p>
        </div>
      </div>
    `
  }),

  weeklyDigest: (orgName, stats) => ({
    subject: "Your Weekly AvCon Portal Summary",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0e7c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Weekly Summary</h1>
        </div>
        <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #061b2d; font-size: 16px;">Hi <strong>${orgName}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6;">Here's a quick summary of your AvCon portal activity this week:</p>
          
          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr style="background: white;">
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed;">Active Listings</td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed; text-align: right; font-weight: bold; color: #0e7c3c;">${stats.activeListing || 0}</td>
            </tr>
            <tr style="background: white;">
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed;">Pending Review</td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed; text-align: right; font-weight: bold; color: #ed8936;">${stats.pendingListings || 0}</td>
            </tr>
            <tr style="background: white;">
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed;">Total Views (approx)</td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e6ed; text-align: right; font-weight: bold; color: #3182ce;">${stats.totalViews || 0}</td>
            </tr>
          </table>
          
          <p style="color: #4a5568; line-height: 1.6;">
            Keep your listings fresh by updating them regularly. Students are looking at thousands of opportunities - make yours stand out!
          </p>
          <hr style="border: none; border-top: 1px solid #e0e6ed; margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Questions? Contact us at support@avcon.ie
          </p>
        </div>
      </div>
    `
  })
};

function setupEmailService() {
  // Using EmailJS-compatible setup
  // In production, configure with real SMTP or EmailJS API
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or your preferred email service
    auth: {
      user: process.env.EMAIL_USER || "noreply@avcon.ie",
      pass: process.env.EMAIL_PASSWORD || "dev-mode"
    }
  });

  return {
    async sendMagicLink(email, orgName, token, loginUrl = "https://avcon.ie/portal/login") {
      const template = templates.magicLink(orgName, token, loginUrl);
      return this.send(email, template);
    },

    async sendApprovalEmail(email, orgName, listingTitle, directoryUrl = "https://avcon.ie/portal") {
      const template = templates.listingApproved(orgName, listingTitle, directoryUrl);
      return this.send(email, template);
    },

    async sendRejectionEmail(email, orgName, listingTitle, reason) {
      const template = templates.listingRejected(orgName, listingTitle, reason);
      return this.send(email, template);
    },

    async sendExpiryReminder(email, orgName, listingTitle, expiryDate) {
      const template = templates.expiryReminder(orgName, listingTitle, expiryDate);
      return this.send(email, template);
    },

    async sendWeeklyDigest(email, orgName, stats) {
      const template = templates.weeklyDigest(orgName, stats);
      return this.send(email, template);
    },

    async send(to, { subject, html }) {
      try {
        const result = await transporter.sendMail({
          from: process.env.EMAIL_FROM || "noreply@avcon.ie",
          to,
          subject,
          html
        });
        return { success: true, messageId: result.messageId };
      } catch (err) {
        console.error("Email send error:", err);
        return { success: false, error: err.message };
      }
    }
  };
}

module.exports = { setupEmailService, templates };
