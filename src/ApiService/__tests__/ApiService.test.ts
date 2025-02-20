import { BASE_URL, fetchWords } from "../ApiService";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("fetchWords", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return data when fetch is successful", async () => {
    // Mocking a successful API response
    const mockResponse = {
      word: "hello",
      phonetics: [{ text: "/həˈləʊ/" }],
      meanings: [
        { partOfSpeech: "noun", definitions: [{ definition: "A greeting" }] },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const word = "hello";

    const data = await fetchWords(word);

    expect(data).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${word}`);
  });

  it("should throw an error when the API responds with an error", async () => {
    const mockError = { title: "Word not found" };

    fetchMock.mockResponseOnce(JSON.stringify(mockError), { status: 404 });

    const word = "nonexistent";

    await expect(fetchWords(word)).rejects.toThrow("Word not found");
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${word}`);
  });

  it("should throw an error when the network request fails", async () => {
    fetchMock.mockRejectOnce(new Error("Network Error"));

    const word = "hello";

    await expect(fetchWords(word)).rejects.toThrow("Network Error");
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${word}`);
  });
});
