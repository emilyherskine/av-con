import React from "react";
import { Header } from "../CommonComponents/Header/Header";
import Footer from "../CommonComponents/Footer/Footer";

/**
 * Root layout wrapper component
 * Provides the main app shell structure for all pages
 */
const RootLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main className="app-content" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
