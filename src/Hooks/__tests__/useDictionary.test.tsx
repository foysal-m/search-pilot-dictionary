import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchWords } from "../../ApiService/ApiService";
import { useDictionary } from "../useDictionary";
import React from "react";

jest.mock("../../ApiService/ApiService", () => ({
  fetchWords: jest.fn(),
}));

const mockData = [
  {
    word: "hello",
    phonetics: [{ text: "/həˈləʊ/" }],
    meanings: [
      { partOfSpeech: "noun", definitions: [{ definition: "A greeting" }] },
    ],
    sourceUrls: ["https://example.com"],
  },
];
describe("useDictionary Hook", () => {
  const queryClient = new QueryClient();

  it("should return data when the fetchWords call is successful", async () => {
    (fetchWords as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useDictionary("hello"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    expect(fetchWords).toHaveBeenCalledWith("hello");
  });

  it("should handle error when fetchWords fails", async () => {
    const mockError = new Error("Failed to fetch");
    (fetchWords as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useDictionary("nonexistentw"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error?.message).toBe("Failed to fetch");
    });

    expect(fetchWords).toHaveBeenCalledWith("nonexistentw");
  });

  it("should not call fetchWords when the word changes", async () => {
    const mockData2 = [
      {
        word: "world",
        phonetics: [{ text: "/wɜːld/" }],
        meanings: [
          { partOfSpeech: "noun", definitions: [{ definition: "The earth" }] },
        ],
        sourceUrls: ["https://example.com"],
      },
    ];

    (fetchWords as jest.Mock)
      .mockResolvedValueOnce(mockData)
      .mockResolvedValueOnce(mockData2);

    // Render hook with word "hello"
    const { result, rerender } = renderHook(({ word }) => useDictionary(word), {
      initialProps: { word: "hello" },
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    // re-render again with the word 'world'
    rerender({ word: "world" });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(fetchWords).toHaveBeenCalledWith("hello");
    expect(fetchWords).toHaveBeenCalledWith("world");
    expect(fetchWords).toHaveBeenCalledTimes(2);
  });
});
