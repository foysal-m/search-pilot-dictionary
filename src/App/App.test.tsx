import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { App } from "./App";
import { useDictionary } from "../Hooks/useDictionary";
import React from "react";

jest.mock("../Hooks/useDictionary");

describe("App Component", () => {
  const mockData = {
    data: [
      {
        word: "hello",
        phonetics: [{ text: "/həˈləʊ/" }, { text: "/həˈloʊ/" }],
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [
              { definition: "A greeting" },
              { definition: "An expression of surprise" },
            ],
            synonyms: ["greeting", "salutation"],
          },
        ],
        sourceUrls: ["https://example.com"],
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  };

  const errorMockData = {
    data: [],
    isLoading: false,
    isError: true,
    error: { message: "Sorry, the word was not found in the dictionary" },
  };

  beforeEach(() => {
    (useDictionary as jest.Mock).mockReturnValue(mockData);
  });

  it("renders the App component", () => {
    render(<App />);

    const headingElement = screen.getByRole("heading", {
      name: /dictionary/i,
    });
    const inputElement = screen.getByPlaceholderText(/Start typing any word/i);
    const buttonElement = screen.getByRole("button", { name: /🔍/i });

    expect(headingElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders loading state when isLoading is true and word is entered", async () => {
    (useDictionary as jest.Mock).mockReturnValue({
      ...mockData,
      isLoading: true,
    });

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/start typing any word/i);
    fireEvent.change(inputElement, { target: { value: "hello" } });

    const buttonElement = screen.getByRole("button", { name: /🔍/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/greeting/i)).not.toBeInTheDocument();

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders word data when not loading", async () => {
    (useDictionary as jest.Mock).mockReturnValue(mockData);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/start typing any word/i);
    fireEvent.change(inputElement, { target: { value: "hello" } });

    const buttonElement = screen.getByRole("button", { name: /🔍/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    expect(screen.getByText(/A greeting/i)).toBeInTheDocument();
    expect(screen.getByText(/həˈloʊ/i)).toBeInTheDocument();
  });

  it("renders error message when a non-existent word is searched", async () => {
    (useDictionary as jest.Mock).mockReturnValue(errorMockData);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/start typing any word/i);
    const buttonElement = screen.getByRole("button", { name: /🔍/i });

    fireEvent.change(inputElement, { target: { value: "nonexistentword" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /sorry, the word was not found in the dictionary/i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
