import { cleanup } from "@testing-library/react";

afterEach(cleanup);

test("compatibility and barrel modules expose their public APIs", () => {
  const LegacyRootLayout = require("./RootLayout").default;
  const RootLayout = require("./layouts/RootLayout").default;
  const { appRoutes, routeMap } = require("./routes");
  const {
    eventLinks,
    aboutLinks,
    primaryLinks,
  } = require("./navigationConfig");
  const constants = require("./constants");
  const { RootLayout: BarrelRootLayout } = require("./layouts");
  const utils = require("./utils");

  expect(LegacyRootLayout).toBe(RootLayout);
  expect(BarrelRootLayout).toBe(RootLayout);
  expect(appRoutes).toBeDefined();
  expect(routeMap).toBeDefined();
  expect(eventLinks).toBeDefined();
  expect(aboutLinks).toBeDefined();
  expect(primaryLinks).toBeDefined();
  expect(constants.APP_CONFIG).toBeDefined();
  expect(constants.HOME_CONFIG).toBeDefined();
  expect(typeof utils.debounce).toBe("function");
  expect(typeof utils.formatDate).toBe("function");
});
