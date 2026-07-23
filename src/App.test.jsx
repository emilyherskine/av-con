import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import HeroSection from "./CommonComponents/HeroSection/HeroSection";
import { Header } from "./CommonComponents/Header/Header";
import Carousel from "./ExhibitorRegistration/CarouselComponent/Carousel";
import PhotoGalleryEmbed from "./PhotoGallery/PhotoGalleryEmbed/galleryEmbed";
import NewsArticle from "./News/NewsArticle/newsArticle";
import Card from "./CommonComponents/Card/Card";
import Highlights from "./Home/hightlights-section";
import MailchimpScript from "./Home/mailChimpPopup";
import Speaker from "./SpeakersPresenters/speaker";
import GOCHighlight from "./SpeakersPresenters/KeyNoteSpeaker/GOCHighlight";
import Speakers2024 from "./SpeakersPresenters/PastSpeakersArchive/speakersPresenters2024.archive";
import Speakers2025 from "./SpeakersPresenters/PastSpeakersArchive/speakersPresenters2025.archive";
import { ENV_CONFIG } from "./config/environment";
import LegacyRootLayout from "./RootLayout";
import * as legacyRoutes from "./routes";
import * as legacyConstants from "./constants";
import * as legacyUtils from "./utils";
import * as legacyLayouts from "./layouts";
import reportWebVitals from "./reportWebVitals";
import {
  debounce,
  formatDate,
  getQueryParam,
  isMobileScreen,
  scrollToTop,
} from "./utils";

jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

const setViewport = (width) => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
};

beforeEach(() => {
  setViewport(1024);
  window.scrollTo = jest.fn();
});

afterEach(cleanup);

describe("application routes", () => {
  const routes = ["/", "/event", "/about", "/contact", "/eventSchedule", "/speakersPresenters", "/photoGallery", "/avConNetwork", "/news", "/avconEzine", "/sponsorsPartners", "/aviationPathwayPortal", "/bookTickets", "/exhibitorRegistration"];

  test.each(routes)("renders %s", (path) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect(document.querySelector(".app-content")).toBeInTheDocument();
  });

  it("redirects an unknown route to the home page", () => {
    window.history.pushState({}, "", "/missing");
    render(<App />);
    expect(screen.getByText("More Than an Event")).toBeInTheDocument();
  });
});

describe("interactive UI", () => {
  it("opens desktop dropdowns and the mobile menu", async () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.mouseEnter(screen.getByText("EVENT INFO"));
    expect(screen.getByText("EVENT SCHEDULE")).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText("EVENT INFO"));
    fireEvent.mouseEnter(screen.getByText("ABOUT AVCON"));
    expect(screen.getByText("NEWS & UPDATES")).toBeInTheDocument();

    setViewport(500);
    cleanup();
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByText("☰"));
    expect(screen.getByText("AVCON 2026 SCHOOL REGISTRATION")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("HOME").at(-1));

    setViewport(1024);
    fireEvent(window, new Event("resize"));
    await new Promise((resolve) => setTimeout(resolve, 160));
  });

  it("updates responsive hero copy and supports optional copy", () => {
    const { rerender } = render(<HeroSection defaultTitle="Desktop" defaultSubtitle="Wide" smallScreenTitle="Mobile" smallScreenSubtitle="Narrow" buttonText="Go" buttonLink="/go" />);
    expect(screen.getByText("Desktop")).toBeInTheDocument();
    setViewport(600);
    fireEvent(window, new Event("resize"));
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    rerender(<HeroSection />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("switches news, gallery, and carousel states", () => {
    render(<NewsArticle title="Article" summary={["Summary"]} fullContent={["Full"]} galleryLink="https://example.test" email="hello@example.test" tags="Tag" />);
    fireEvent.click(screen.getByText("Read More ▼"));
    expect(screen.getByText("Full")).toBeInTheDocument();
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    cleanup();

    render(<PhotoGalleryEmbed />);
    fireEvent.click(screen.getByText("2025 Shannon Irvine Gallery"));
    fireEvent.click(screen.getByText("2025 BCFE Gallery"));
    expect(screen.getByTitle("AvCon Photo Gallery")).toHaveAttribute("src", expect.stringContaining("1welPj"));
    fireEvent.click(screen.getByText("2024 Shannon Irvine Gallery"));
    fireEvent.click(screen.getByText("2025 Air Corps Gallery"));
    cleanup();

    render(<Carousel images={["first", "second"]} />);
    fireEvent.click(screen.getByText("❮"));
    expect(screen.getByAltText("Slide 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("❯"));
    expect(screen.getByAltText("Slide 0")).toBeInTheDocument();
    fireEvent.click(screen.getByText("❯"));
    expect(screen.getByAltText("Slide 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("❮"));
    expect(screen.getByAltText("Slide 0")).toBeInTheDocument();
    fireEvent.click(document.querySelectorAll(".dot")[1]);
    expect(screen.getByAltText("Slide 1")).toBeInTheDocument();
    cleanup();
    render(<NewsArticle title="Defaults" />);
    fireEvent.click(screen.getByText("Read More ▼"));
  });
});

describe("standalone and legacy components", () => {
  it("renders reusable, archived, and compatibility exports", () => {
    expect(ENV_CONFIG.isProduction).toBe(false);
    expect(legacyRoutes.appRoutes).toHaveLength(14);
    expect(legacyConstants.APP_CONFIG).toBeDefined();
    expect(legacyUtils.debounce).toBe(debounce);
    expect(legacyLayouts.RootLayout).toBeDefined();

    render(<MemoryRouter><LegacyRootLayout><span>Child</span></LegacyRootLayout></MemoryRouter>);
    expect(screen.getByText("Child")).toBeInTheDocument();
    cleanup();
    render(<Card imageSrc="image" heading="Heading" description="Description" />);
    expect(screen.getByText("Heading")).toBeInTheDocument();
    cleanup();
    render(<Highlights />);
    expect(screen.getByText("Design Challenges")).toBeInTheDocument();
    cleanup();
    const { unmount } = render(<MailchimpScript />);
    expect(document.getElementById("mcjs")).toBeInTheDocument();
    unmount();
    expect(document.getElementById("mcjs")).not.toBeInTheDocument();
    render(<Speaker SpeakerImage="image" SpeakerName="Short" SpeakerBio="short" />);
    expect(screen.queryByText("Expand for More")).not.toBeInTheDocument();
    cleanup();
    render(<Speaker SpeakerImage="image" SpeakerName="Long" SpeakerBio={"a".repeat(101)} />);
    fireEvent.click(screen.getByText("Expand for More"));
    expect(screen.getByText("Show Less")).toBeInTheDocument();
    cleanup();
    render(<GOCHighlight SpeakerImage="image" SpeakerName="Keynote" SpeakerBio={"a".repeat(151)} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand full bio" }));
    expect(screen.getByRole("button", { name: "Collapse bio" })).toBeInTheDocument();
    cleanup();
    render(<Speakers2024 />);
    expect(screen.getByText("AvCon Presenters")).toBeInTheDocument();
    cleanup();
    render(<Speakers2025 />);
    expect(screen.getByText("AvCon Presenters")).toBeInTheDocument();
  });
});

describe("utilities and performance reporting", () => {
  it("runs every utility path", () => {
    setViewport(700);
    expect(isMobileScreen()).toBe(true);
    expect(isMobileScreen(600)).toBe(false);
    expect(formatDate("2026-02-03")).toBe("02/03/2026");
    expect(formatDate("2026-02-03", "YYYY-DD-MM")).toBe("2026-03-02");
    window.history.pushState({}, "", "/?source=test");
    expect(getQueryParam("source")).toBe("test");
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    jest.useFakeTimers();
    const callback = jest.fn();
    const delayed = debounce(callback, 50);
    delayed("first");
    delayed("last");
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledWith("last");
    jest.useRealTimers();
  });

  it("reports web vitals only when given a callback", async () => {
    reportWebVitals();
    const callback = jest.fn();
    reportWebVitals(callback);
    const vitals = await import("web-vitals");
    expect(vitals.getCLS).toHaveBeenCalledWith(callback);
    expect(vitals.getTTFB).toHaveBeenCalledWith(callback);
  });
});
