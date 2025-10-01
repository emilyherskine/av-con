import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import FirstImageAndText from "./FirstImageAndText/firstBlockOfText";
import MiddleBlockOfText from "./MiddleBlockOfText/middleBlock";
import MailchimpScript from "./mailChimpPopup";
import Highlights from "./hightlights-section";
import LastBlockOfText from "./LastBlockOfText/lastBlackOfText";
import AVConBanner from "./HomePageImages/AVConBanner.jpg";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col justify-between p-24">
            <HeroSection
                defaultTitle="AN UNFORGETTABLE THRILL FOR AVIATION ENTHUSIASTS"
                defaultSubtitle="AvCon 2025 Live Stream"
                smallScreenTitle="AvCon 2025"
                smallScreenSubtitle="The Sky Isn't the Limit — It's Only the Beginning."
                buttonText="Watch The AvCon 2025 Live Stream"
                buttonLink="https://avcon.ie/BookTickets"
            />
            <FirstImageAndText />
            <img
                src={AVConBanner}
                alt="AVCon Banner"
                style={{
                    width: "100%",
                    maxWidth: "100%",
                }}
            />
            <MiddleBlockOfText />
            <Highlights />
            <LastBlockOfText />
            <MailchimpScript />
        </main>
    );
}
