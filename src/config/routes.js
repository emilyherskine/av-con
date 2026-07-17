// Centralized routes configuration for maintainability
// All paths use consistent lowercase camelCase

import React from "react";

// Core pages
import Home from "../Home/home";
import Event from "../Event/event";
import About from "../About/about";
import Contact from "../Contact/contact";

// Event-related pages
import EventSchedule from "../EventSchedule/eventSchedule";
import SpeakersPresenters from "../SpeakersPresenters/speakersPresenters";
import PhotoGallery from "../PhotoGallery/photoGallery";
import AvConNetwork from "../AvConNetwork/avConNetwork";

// About-related pages
import News from "../News/newsUpdates";
import AvConEzine from "../AvConEzine/AvConEzine";
import SponsorsPartners from "../SponsorsPartners/sponsorsPartners";
import AviationPathwayPortal from "../AvconPathwayPortal/pathwayPortal";

// Registration pages
import BookTickets from "../BookTickets/register";
import ExhibitorRegistration from "../ExhibitorRegistration/exhibitor";

const routeDefinitions = [
    { key: "home", path: "/", element: Home, exact: true },
    { key: "event", path: "/event", element: Event },
    { key: "about", path: "/about", element: About },
    { key: "contact", path: "/contact", element: Contact },
    { key: "eventSchedule", path: "/eventSchedule", element: EventSchedule },
    { key: "speakersPresenters", path: "/speakersPresenters", element: SpeakersPresenters },
    { key: "photoGallery", path: "/photoGallery", element: PhotoGallery },
    { key: "avConNetwork", path: "/avConNetwork", element: AvConNetwork },
    { key: "news", path: "/news", element: News },
    { key: "avconEzine", path: "/avconEzine", element: AvConEzine },
    { key: "sponsorsPartners", path: "/sponsorsPartners", element: SponsorsPartners },
    { key: "aviationPathwayPortal", path: "/aviationPathwayPortal", element: AviationPathwayPortal },
    { key: "bookTickets", path: "/bookTickets", element: BookTickets },
    { key: "exhibitorRegistration", path: "/exhibitorRegistration", element: ExhibitorRegistration },
];

/**
 * Application routes configuration
 * Paths use consistent lowercase camelCase for clarity
 */
export const appRoutes = routeDefinitions.map(({ element: Element, ...route }) => ({
    ...route,
    element: <Element />,
}));

/**
 * Map routes to navigation items for flexible updates
 * Makes it easy to sync navigation with actual routes
 */
export const routeMap = routeDefinitions.reduce((acc, { key, path }) => {
    acc[key] = path;
    return acc;
}, {});
