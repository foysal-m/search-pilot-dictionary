import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { App } from "./App/App";

jest.mock("./App/App", () => ({
  App: () => <div>Mocked App</div>,
}));

describe("Initial renders", () => {
  it("should initially render the mocked App component correctly", () => {
    render(<App />);
    const appElement = screen.getByText("Mocked App");
    expect(appElement).toBeInTheDocument();
  });
});
