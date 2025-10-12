import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PiletPhoto from "../HomePageImages/_HAN7008.JPG";
import "../../index.css";
import "./FirstImageAndText.css";

export default function FirstImageAndText() {
    return (
        <Box className="mt-3 mb-3 box-padding">
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <img
                        src={PiletPhoto}
                        alt="Pilet Photo"
                        className="pilet-photo"
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <div className="flex-container-col space-between ml-1 mr-1">
                        <h3 className="mb-2">
                            AvCon 2026 - The Future of Aviation & Aerospace Is Taking Off
                        </h3>
                        <div className="flex-container-col space-between">
                            <p className="text-left mb-1">
                                Where the next generation of talent meets the trailblazers of the skies.
                                <br />
                                Where ideas ignite, careers take flight, and the industry connects with its future.
                            </p>
                            <p className="text-left">
                                After two incredible years inspiring thousands of students and professionals, AvCon returns in 2026 even bigger than before - expanding into a two-part experience with AvCon: The Future of Aviation & Aerospace and the AvCon Industry Convention.
                            </p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};
