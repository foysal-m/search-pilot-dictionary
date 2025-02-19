const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const fetchWords = (word: string) => {
  return fetch(`${BASE_URL}${word}`).then((res) => res.json());
};
