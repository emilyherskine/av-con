// Common utility functions

/**
 * Check if screen size is mobile
 * @param {number} breakpoint - Breakpoint in pixels
 * @returns {boolean}
 */
export const isMobileScreen = (breakpoint = 768) => {
    return window.innerWidth < breakpoint;
};

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function}
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (e.g., "MM/DD/YYYY")
 * @returns {string}
 */
export const formatDate = (date, format = "MM/DD/YYYY") => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    
    return format.replace("MM", month).replace("DD", day).replace("YYYY", year);
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null}
 */
export const getQueryParam = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
};
