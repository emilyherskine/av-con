import React from "react";
import "./App.module.css";
import "./index.css";
import RootLayout from "./RootLayout";
import About from "./About/about";
import Contact from "./Contact/contact";
import Home from "./Home/home";
import Event from "./Event/event";
import BookTickets from "./BookTickets/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventSchedule from "./EventSchedule/eventSchedule";
import News from "./News/newsUpdates";
import SpeakersPresenters from "./SpeakersPresenters/speakersPresenters";
import SponsorsPartners from "./SponsorsPartners/sponsorsPartners";
import ExhibitorRegistration from "./ExhibitorRegistration/exhibitor";
import AviationPathwayPortal from "./AvconPathwayPortal/pathwayPortal";
import AvConIndustryConvention from "./AvConIndustryConvention/avConIndustryConvention"
import AvConEzine from "./AvConEzine/AvConEzine";
import PhotoGallery from "./PhotoGallery/photoGallery";
import DFCon from "./DFCon/dfCon";

export default function App() {
    return (
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/dfCon" element={<DFCon />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/bookTickets" element={<BookTickets />} />
                    <Route path="/eventSchedule" element={<EventSchedule />} />
                    <Route path="/photoGallery" element={<PhotoGallery />} />
                    <Route path="/avConIndustryConvention" element={<AvConIndustryConvention />} />
                    <Route path="/news" element={<News />} />
                    <Route
                        path="/speakersPresenters"
                        element={<SpeakersPresenters />}
                    />
                    <Route
                        path="/sponsorsPartners"
                        element={<SponsorsPartners />}
                    />
                    <Route
                        path="/exhibitorRegistration"
                        element={<ExhibitorRegistration />}
                    />
                    <Route
                        path="/aviationPathwayPortal"
                        element={<AviationPathwayPortal />}
                    />
                     <Route
                        path="/avconEzine"
                        element={<AvConEzine />}
                    />
                </Routes>
            </RootLayout>
        </BrowserRouter>
    );
}
