import React from "react";

jest.mock("react-dom/client", () => ({
    createRoot: jest.fn(() => ({ render: jest.fn() })),
}));
jest.mock("./App", () => () => <div>Application</div>);

test("mounts the application into the root element", () => {
    document.body.innerHTML = '<div id="root"></div>';
    const { createRoot } = require("react-dom/client");

    require("./index");

    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));
    expect(createRoot.mock.results[0].value.render).toHaveBeenCalledTimes(1);
});
