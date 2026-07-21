import React from "react";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import "./AvConEzine.css";


const ezines = [
    {
        year: "2025",
        title: "AvCon Christmas Ezine 2025 – Celebrating Two Years of Inspiration",
        description:
            "Our special Christmas Edition of the AvCon Altitude Ezine brings together another incredible year of aviation, aerospace, innovation, and inspiration. This limited-edition publication celebrates the growing AvCon community and our shared commitment to building pathways for the next generation.",
        embed:
            "https://e.issuu.com/embed.html?d=christmas_avcon_2025_altitude_ezine_&u=tyhub",
    },

    {
        year: "2025",
        title: "AvCon Ezine 2025",
        description:
            "Discover the highlights, stories, industry insights and inspirational moments from AvCon 2025.",
        embed:
            "https://issuu.com/tyhub/docs/avcon_2025_ezine?fr=xKAE9_zU1NQ",
    },

    {
        year: "2024",
        title: "AvCon Ezine 2024",
        description:
            "Explore the first AvCon Ezine featuring aviation pathways, industry stories, student experiences and the future of aviation.",
        embed:
            "https://e.issuu.com/embed.html?d=avcon_ezine_2024-3&u=tyhub",
    },
];


export default function AvConEzine() {


    return (

        <main className="main-container">


            <HeroSection

                defaultTitle="AVCON EZINE"

                defaultSubtitle="Explore stories, insights and highlights from AvCon's aviation and aerospace community."

                smallScreenTitle="AvCon Ezine"

                smallScreenSubtitle="Discover the stories behind AvCon"

            />



            <section className="ezine-intro">


                <h2>
                    The AvCon Altitude Ezine
                </h2>


                <p>

                    Welcome to the AvCon Ezine collection — a showcase of stories,
                    achievements and inspiration from across the aviation and
                    aerospace community.

                    <br/><br/>

                    From student experiences and industry insights to career
                    pathways and future technologies, each edition captures the
                    people and ideas helping shape tomorrow's workforce.

                </p>


            </section>




            <section className="ezine-grid">


                {ezines.map((ezine, index) => (

                    <article 
                        className="ezine-card"
                        key={index}
                    >


                        <header>

                            <span className="ezine-year">
                                {ezine.year}
                            </span>


                            <h3>
                                {ezine.title}
                            </h3>

                        </header>



                        <p>
                            {ezine.description}
                        </p>




                        <div className="iframe-container">

                            <iframe

                                src={ezine.embed}

                                title={ezine.title}

                                allowFullScreen

                                loading="lazy"

                                className="ezine-iframe"

                            />

                        </div>


                    </article>

                ))}


            </section>


        </main>

    );

}