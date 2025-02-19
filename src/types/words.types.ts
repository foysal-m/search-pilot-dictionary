export type ReturnedWordType = {
  phonetic?: string;
  word: string;
  phonetics?: string;
  meanings: {
    synonyms: boolean;
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
    }[];
  }[];
  sourceUrls: string;
};
