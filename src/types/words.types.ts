export type WordTypes = {
  word: string;
  phonetics:
    | {
        text: string;
      }[]
    | string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      // synonyms: string[];
    }[];
  }[];
  sourceUrls: string[];
};
