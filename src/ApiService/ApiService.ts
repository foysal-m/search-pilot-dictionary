const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const fetchWords = (word: string) => {
  return fetch(`${BASE_URL}${word}`)
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.title);
        });
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
