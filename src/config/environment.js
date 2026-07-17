// Environment configuration
// Use this for API endpoints, feature flags, and environment-specific settings

const ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = ENV === "production";

export const ENV_CONFIG = {
    env: ENV,
    isDevelopment: ENV === "development",
    isProduction: IS_PRODUCTION,
    isDemoMode: !IS_PRODUCTION,
    
    // API Configuration
    api: {
        baseUrl: process.env.REACT_APP_API_URL || "https://api.avcon.ie",
        timeout: 30000,
    },
    
    // Feature Flags
    features: {
        enableAnalytics: IS_PRODUCTION,
        enableErrorReporting: IS_PRODUCTION,
        enableDebugMode: !IS_PRODUCTION,
    },
};
