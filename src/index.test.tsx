import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App/App";

describe("index.tsx", () => {
  it("should initially render the app correctly", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const appElement = screen.getByRole("heading", { name: /dictionary/i });
    expect(appElement).toBeInTheDocument();
  });
});
