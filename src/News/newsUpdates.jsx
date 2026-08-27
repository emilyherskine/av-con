import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import FacebookNews from "./facebookNews/facebookNews.jsx";
import NewsContent from "./newsContent/newsContent.jsx";
import SocialCard from "../CommonComponents/SocialCard/SocialCard";
import VideoEmbed from "../CommonComponents/VideoEmbed/VideoEmbed";

import "./newsUpdates.css";

export default function News() {
  return (
    <main className="news-page">
      {/* Header */}

      <section className="news-hero">
        <h1>AvCon News & Updates</h1>

        <p>
          Stay connected with the latest announcements, stories, industry
          updates and highlights from AvCon.
        </p>

        <p>
          Connecting Industry. Inspiring Talent. Shaping Tomorrow's Workforce.
        </p>
      </section>

      {/* Featured */}

      <section className="featured-news">
        <Box>
          <span>FEATURED UPDATE</span>

          <h2>AvCon 2026 - The Future of Aviation & Aerospace</h2>

          <p>
            Follow the journey as AvCon brings together students, educators,
            industry and government to inspire the next generation of aviation
            and aerospace professionals.
          </p>
        </Box>
      </section>

      <Grid container spacing={4} className="news-layout">
        {/* News Articles */}

        <Grid item xs={12} lg={8}>
          <section>
            <h2 className="section-title">Latest News</h2>

            <NewsContent />
          </section>
        </Grid>

        {/* Social */}

        <Grid item xs={12} lg={4}>
          <aside className="social-sidebar">
            <h2 className="section-title">Follow AvCon</h2>

            <SocialCard title="🎥 AvCon Live">
              <VideoEmbed src="https://www.youtube.com/embed/videoseries?si=X0ZMQCI5w-k9s84C&amp;list=PLKqYIkM4gVMV9yfE4WkiBRn141HuYwuGa" />
            </SocialCard>

            <SocialCard title="📘 Facebook Updates">
              <FacebookNews />
            </SocialCard>
          </aside>
        </Grid>
      </Grid>
    </main>
  );
}
