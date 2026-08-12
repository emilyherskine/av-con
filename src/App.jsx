import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RootLayout } from "./layouts";
import { appRoutes } from "./config/routes";
import "./App.module.css";
import "./index.css";

const theme = createTheme({
    palette: {
        text: {
            // MUI applies color transformations (for example, alpha()) to palette
            // values. Those utilities require a concrete color, not a CSS variable.
            // Keep these in sync with the CSS custom properties in index.css.
            primary: "#f4f7f9",
            secondary: "#c5d0d8",
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h1: { fontSize: "var(--avcon-font-h1)", fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: "var(--avcon-font-h2)", fontWeight: 700, lineHeight: 1.25 },
        h3: { fontSize: "var(--avcon-font-h3)", fontWeight: 700, lineHeight: 1.3 },
        h4: { fontSize: "var(--avcon-font-h4)", fontWeight: 700, lineHeight: 1.35 },
        h5: { fontSize: "var(--avcon-font-body)", fontWeight: 700, lineHeight: 1.4 },
        body1: { fontSize: "var(--avcon-font-body)", lineHeight: "var(--avcon-line-body)" },
        body2: { fontSize: "var(--avcon-font-small)", lineHeight: "var(--avcon-line-body)" },
    },
});

/**
 * Main App Component
 * Sets up routing and layout structure for the entire application
 */
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <RootLayout>
                    <Routes>
                        {appRoutes.map((route) => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </ThemeProvider>
    );
}
