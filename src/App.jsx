import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts";
import { appRoutes } from "./config/routes";
import "./App.module.css";
import "./index.css";

/**
 * Main App Component
 * Sets up routing and layout structure for the entire application
 */
export default function App() {
    return (
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
    );
}
