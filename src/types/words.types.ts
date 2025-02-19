export type WordTypes = {
  word: string;
  phonetics: {
    text: string;
    audio?: string;
    sourceUrl?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
    }[];
  }[];
  sourceUrls: string[];
};
