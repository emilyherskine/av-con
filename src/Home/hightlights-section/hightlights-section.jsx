import React from "react";
import Card from "../../CommonComponents/Card/Card";

import StudentsImg from "./HomePageImages/_HAN6084.jpeg";
import CuttingEdgeImg from "./HomePageImages/_HAN6110.JPG";
import HandsOnImg from "./HomePageImages/_HAN7138 (1).png";
import CareerImg from "./HomePageImages/_HAN6449.JPG";
import PilotExpImg from "./HomePageImages/_HAN6730.JPG";
import InspirationImg from "./HomePageImages/_HAN7086.JPG";
import GlobalKnowledgeImg from "./HomePageImages/_HAN7459.JPG";
import DesignChallengeImg from "./HomePageImages/_HAN7087.JPG";

const cardData = [
    {
        imageSrc: StudentsImg,
        heading: "Students and Aerospace",
        description: "AvCon 2025: A thrilling journey into the future of aviation, aerospace, space & STEM for students."
    },
    {
        imageSrc: CuttingEdgeImg,
        heading: "Cutting-edge Tech",
        description: "Explore the wonders of aviation, from basics to cutting-edge technology."
    },
    {
        imageSrc: HandsOnImg,
        heading: "Hands-on Learning",
        description: "Hands-on learning for primary and secondary students on flight principles and aerodynamics."
    },
    {
        imageSrc: CareerImg,
        heading: "Find a Career",
        description: "Career pathways for TY, LCA, LCVP, LC and tertiary students, connecting with industry professionals."
    },
    {
        imageSrc: InspirationImg,
        heading: "Be Inspired",
        description: "Inspirational speakers discussing the future of air travel, space exploration, and sustainable aviation."
    },
    {
        imageSrc: PilotExpImg,
        heading: "The Pilot Experience",
        description: "Flight simulators and virtual reality experiences for an immersive pilot experience."
    },
    {
        imageSrc: GlobalKnowledgeImg,
        heading: "Global Knowledge",
        description: "Global perspectives on aviation's role in connecting the world and addressing environmental challenges."
    },
    {
        imageSrc: DesignChallengeImg,
        heading: "Design Challenges",
        description: "Unleash creativity with aviation-themed workshops, design challenges, and competitions."
    }
];

export default function Highlights() {
    return (
        <div className="mt-3 mb-3">
            <div
                className="card-container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    padding: '1.5%',
                }}
            >
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        imageSrc={card.imageSrc}
                        heading={card.heading}
                        description={card.description}
                    />
                ))}
            </div>
        </div>
    );
}
