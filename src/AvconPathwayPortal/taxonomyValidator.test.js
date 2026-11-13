import { validateCategory, validateSector, validateTaxonomy, getCanonicalCategory, getCanonicalSector, validateListing } from "./taxonomyValidator.js";

describe("taxonomyValidator", () => {
  describe("validateCategory", () => {
    it("accepts valid capitalized categories", () => {
      expect(() => validateCategory("Careers")).not.toThrow();
      expect(() => validateCategory("Apprenticeships")).not.toThrow();
      expect(() => validateCategory("Events")).not.toThrow();
    });

    it("rejects lowercase categories", () => {
      expect(() => validateCategory("careers")).toThrow();
      expect(() => validateCategory("apprenticeships")).toThrow();
    });

    it("rejects invalid categories", () => {
      expect(() => validateCategory("Invalid")).toThrow();
      expect(() => validateCategory("")).toThrow();
      expect(() => validateCategory(null)).toThrow();
    });
  });

  describe("validateSector", () => {
    it("accepts valid capitalized sectors", () => {
      expect(() => validateSector("Airlines & Aviation")).not.toThrow();
      expect(() => validateSector("Aircraft Maintenance & MRO")).not.toThrow();
    });

    it("rejects lowercase sectors", () => {
      expect(() => validateSector("airlines & aviation")).toThrow();
      expect(() => validateSector("aircraft maintenance & mro")).toThrow();
    });

    it("rejects invalid sectors", () => {
      expect(() => validateSector("Invalid Sector")).toThrow();
      expect(() => validateSector("")).toThrow();
    });
  });

  describe("validateTaxonomy", () => {
    it("accepts both valid values", () => {
      expect(() => validateTaxonomy("Careers", "Airlines & Aviation")).not.toThrow();
    });

    it("rejects if either value is invalid", () => {
      expect(() => validateTaxonomy("careers", "Airlines & Aviation")).toThrow();
      expect(() => validateTaxonomy("Careers", "airlines & aviation")).toThrow();
    });
  });

  describe("getCanonicalCategory", () => {
    it("returns canonical form of category", () => {
      expect(getCanonicalCategory("careers")).toBe("Careers");
      expect(getCanonicalCategory("CAREERS")).toBe("Careers");
      expect(getCanonicalCategory("Careers")).toBe("Careers");
    });

    it("returns null for invalid categories", () => {
      expect(getCanonicalCategory("invalid")).toBeNull();
      expect(getCanonicalCategory("")).toBeNull();
      expect(getCanonicalCategory(null)).toBeNull();
    });
  });

  describe("validateListing", () => {
    it("accepts valid listings", () => {
      const listing = {
        title: "Test Listing",
        description: "A test listing",
        category: "Careers",
        sector: "Airlines & Aviation",
        location: "Dublin",
        application_url: "https://example.com",
        expires_on: "2027-12-31"
      };
      expect(() => validateListing(listing)).not.toThrow();
    });

    it("rejects listings with invalid category case", () => {
      const listing = {
        title: "Test",
        description: "Test",
        category: "careers",  // lowercase - WRONG
        sector: "Airlines & Aviation",
        location: "Dublin",
        application_url: "https://example.com"
      };
      expect(() => validateListing(listing)).toThrow(/Invalid category/);
    });

    it("rejects listings with missing required fields", () => {
      const listing = {
        title: "",  // empty
        description: "Test",
        category: "Careers",
        sector: "Airlines & Aviation",
        location: "Dublin",
        application_url: "https://example.com"
      };
      expect(() => validateListing(listing)).toThrow(/Title is required/);
    });
  });
});
