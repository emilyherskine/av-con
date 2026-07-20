import React from "react";
import "../AvconPathwayPortal.css";


export default function FirstImageAndText() {

    return (

        <section className="intro-section">

            <h2>
                Welcome to A.P.P.
            </h2>


            <p>
                The Aviation Pathways Portal (A.P.P.) is AvCon’s platform
                connecting aspiring professionals with exciting opportunities
                across aviation, aerospace and space industries.
            </p>


            <p>
                Whether you are a student exploring career options,
                a graduate beginning your journey, or a professional looking
                to advance your skills, A.P.P. provides access to:
            </p>


            <div className="intro-highlights">

                <span>
                    Work Experience
                </span>

                <span>
                    Internships
                </span>

                <span>
                    Graduate Programmes
                </span>

                <span>
                    Courses & Training
                </span>

            </div>


            <p>

                Industry professionals can also share opportunities directly
                with the AvCon community. Contact{" "}
                
                <a href="mailto:hello@avcon.ie">
                    hello@avcon.ie
                </a>

                {" "}to list your opportunity for free.

            </p>


        </section>

    );

}