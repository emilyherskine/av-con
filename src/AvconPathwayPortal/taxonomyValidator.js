/**
 * Taxonomy Validator
 * Ensures all category and sector values match the exact capitalization from taxonomy.json
 * This prevents "Complete all required fields" errors caused by case mismatches
 */

import taxonomy from "./taxonomy.json";

const { categories, sectors } = taxonomy;

/**
 * Validates that a category is in the official taxonomy
 * @param {string} category - The category to validate
 * @returns {boolean} - True if valid
 * @throws {Error} - If category is invalid
 */
export function validateCategory(category) {
  if (!category || !categories.includes(category)) {
    const validOptions = categories.join(", ");
    throw new Error(
      `Invalid category: "${category}". Must be one of: ${validOptions}`
    );
  }
  return true;
}

/**
 * Validates that a sector is in the official taxonomy
 * @param {string} sector - The sector to validate
 * @returns {boolean} - True if valid
 * @throws {Error} - If sector is invalid
 */
export function validateSector(sector) {
  if (!sector || !sectors.includes(sector)) {
    const validOptions = sectors.join(", ");
    throw new Error(
      `Invalid sector: "${sector}". Must be one of: ${validOptions}`
    );
  }
  return true;
}

/**
 * Validates both category and sector
 * @param {string} category - The category to validate
 * @param {string} sector - The sector to validate
 * @returns {boolean} - True if both valid
 * @throws {Error} - If either is invalid
 */
export function validateTaxonomy(category, sector) {
  validateCategory(category);
  validateSector(sector);
  return true;
}

/**
 * Gets the canonical category (in case someone needs to normalize user input)
 * NOTE: This should NOT be used to auto-fix user input - always show the user
 * the official list via dropdowns to ensure they select the exact value
 * @param {string} input - Possible category input
 * @returns {string|null} - The canonical category or null if not found
 */
export function getCanonicalCategory(input) {
  if (!input) return null;
  return categories.find((cat) => cat.toLowerCase() === input.toLowerCase()) || null;
}

/**
 * Gets the canonical sector (in case someone needs to normalize user input)
 * NOTE: This should NOT be used to auto-fix user input - always show the user
 * the official list via dropdowns to ensure they select the exact value
 * @param {string} input - Possible sector input
 * @returns {string|null} - The canonical sector or null if not found
 */
export function getCanonicalSector(input) {
  if (!input) return null;
  return sectors.find((sec) => sec.toLowerCase() === input.toLowerCase()) || null;
}

/**
 * Validates listing data before sending to API
 * Catches common errors like lowercase category/sector
 * @param {object} listing - The listing object to validate
 * @returns {boolean} - True if valid
 * @throws {Error} - With helpful message if invalid
 */
export function validateListing(listing) {
  if (!listing.category) {
    throw new Error("Category is required");
  }
  if (!listing.sector) {
    throw new Error("Sector is required");
  }

  validateCategory(listing.category);
  validateSector(listing.sector);

  if (!listing.title || !listing.title.trim()) {
    throw new Error("Title is required");
  }
  if (!listing.description || !listing.description.trim()) {
    throw new Error("Description is required");
  }
  if (!listing.location || !listing.location.trim()) {
    throw new Error("Location is required");
  }
  if (!listing.application_url || !listing.application_url.trim()) {
    throw new Error("Application URL is required");
  }

  // Validate date format if provided
  if (listing.expires_on) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(listing.expires_on)) {
      throw new Error("Expiry date must be in YYYY-MM-DD format");
    }
  }

  return true;
}

export { categories, sectors };
