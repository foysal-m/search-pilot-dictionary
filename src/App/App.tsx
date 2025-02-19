import React, { useState } from "react";

import { useWords } from "../Hooks/useWord";
import { SearchBar } from "../SearchBar/SearchBar";

import "./App.scss";

export const App = () => {
  const [word, setWord] = useState("");

  const { data, isLoading, error } = useWords(word);

  const handleFormSubmit = (formData: FormData) => {
    const word = formData.get("word") as string;
    if (word) {
      setWord(word.trim());
    }
  };

  const returnedWord = data &&
    data[0] && {
      word: data[0].word,
      phonetics: data[0].phonetics[1]?.text,
      meanings: data[0].meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((definition, index) => ({
          definition: definition.definition,
        })),
        synonyms: meaning.synonyms,
      })),
      sourceUrls: data[0]?.sourceUrls[0],
    };

  console.log(returnedWord);

  return (
    <div className="App">
      <h2>Dictionary</h2>
      <SearchBar action={handleFormSubmit} />
    </div>
  );
};
