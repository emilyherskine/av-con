// Navigation configuration - centralized for easy maintenance
// All paths use consistent lowercase camelCase for routing

export const eventLinks = [
    { label: "EVENT SCHEDULE", to: "/eventSchedule" },
    { label: "THE AVCON NETWORK", to: "/avConNetwork" },
    { label: "SPEAKERS & PRESENTERS", to: "/speakersPresenters" },
    { label: "AVCON PHOTO GALLERY", to: "/photoGallery" },
];

export const aboutLinks = [
    { label: "NEWS & UPDATES", to: "/news" },
    { label: "AVCON EZINE", to: "/avconEzine" },
    { label: "SPONSORS & PARTNERS", to: "/sponsorsPartners" },
    { label: "AVIATION PATHWAY PORTAL", to: "/aviationPathwayPortal" },
];

export const primaryLinks = [
    { label: "HOME", to: "/" },
    { label: "EVENT INFO", to: "/event", children: eventLinks },
    { label: "ABOUT AVCON", to: "/about", children: aboutLinks },
    { label: "CONTACT US", to: "/contact" },
    { label: "EXHIBITOR REGISTRATION", to: "/exhibitorRegistration" },
];
