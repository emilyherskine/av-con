import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../../index.css";
import "./MiddleBlockOfText.css";

export default function MiddleBlockOfText() {
    return (
        <Box component="section">
            <hr aria-hidden="true" />

            <Grid container spacing={4} justifyContent="center" alignItems="stretch" style={{padding: '2%'}}>
                {/* Online Event Info */}
                <Grid item xs={12} md={4}>
                    <article className="info-block text-light">
                        <Typography variant="h3" component="h3" className="info-title">
                            Can't make it to AvCon in person? No problem!
                        </Typography>
                        <Typography paragraph>
                            Wherever you are, you can still be part of AvCon - <strong>The Future of Aviation</strong>.
                        </Typography>
                        <Typography paragraph>
                            Join us online and experience this inspiring event from anywhere.
                        </Typography>
                        <a
                            href="https://avcon.ie/BookTickets"
                            className="btn-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Watch The AvCon 2025 Live Stream"
                        >
                           Watch The AvCon 2025 Live Stream
                        </a>
                    </article>
                </Grid>
                <Grid item xs={12} md={4}>
                    <article className="info-block text-light">
                        <Typography variant="h3" component="h3" className="info-subtitle">
                            Location
                        </Typography>
                        <Typography paragraph>
                            Irish Air Corps, Casement Aerodrome, Baldonnel, County Dublin
                        </Typography>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Irish+Air+Corps,+Casement+Aerodrome,+Baldonnel,+County+Dublin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                            aria-label="Get directions to the event location on Google Maps"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                viewBox="0 96 960 960"
                                className="icon"
                                aria-hidden="true"
                            >
                                <path
                                    fill="currentColor"
                                    d="M480 872q111-120 165.5-208.5T700 520q0-90-60-150t-150-60q-90 0-150 60t-60 150q0 54 54.5 142.5T480 872Zm0 104q-7 0-14-3t-13-8q-127-137-188-237.5T204 520q0-121 79.5-200.5T480 240q121 0 200.5 79.5T760 520q0 73-61 173.5T512 965q-6 5-13 8t-19 3ZM480 632q34 0 57-23t23-57q0-34-23-57t-57-23q-34 0-57 23t-23 57q0 34 23 57t57 23Z"
                                />
                            </svg>
                            <span>Get directions</span>
                        </a>
                    </article>
                    <article className="info-block text-light">
                        <Typography variant="h3" component="h3" className="info-subtitle">
                            Date
                        </Typography>
                        <Typography paragraph>October 2nd, 2025</Typography>
                        <a
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AvCon+2025&dates=20251002T090000Z/20251002T170000Z&details=Join+us+at+the+Irish+Air+Corps,+Casement+Aerodrome,+Baldonnel,+County+Dublin&location=Irish+Air+Corps,+Casement+Aerodrome,+Baldonnel,+County+Dublin+for+AvCon+2025"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                            aria-label="Add AvCon 2025 to Google Calendar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                viewBox="0 0 24 24"
                                className="icon"
                                aria-hidden="true"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 
                                    0-2 .9-2 2v14c0 1.1.89 2 2 
                                    2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                                    16H5V10h14v10zm0-12H5V6h14v2z"
                                />
                            </svg>
                            <span>Add to Google Calendar</span>
                        </a>
                    </article>
                </Grid>
            </Grid>

            <hr aria-hidden="true" />
        </Box>
    );
}
