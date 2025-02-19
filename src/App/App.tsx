import React, { useState } from "react";

import { useWords } from "../Hooks/useWord";
import { SearchBar } from "../SearchBar/SearchBar";

import "./App.scss";
import { DictionaryCard } from "../WordCard/DictionaryCard";
import { WordTypes } from "../types/words.types";

export const App = () => {
  const [word, setWord] = useState("");

  const { data, isLoading, error } = useWords(word);

  const handleFormSubmit = (formData: FormData) => {
    const word = formData.get("word") as string;
    if (word) {
      setWord(word.trim());
    }
  };

  const returnedWord: WordTypes = data &&
    data[0] && {
      word: data[0].word,
      phonetics: data[0]?.phonetics[1]?.text,
      meanings: data[0].meanings[0],
      sourceUrls: data[0]?.sourceUrls[0],
    };

  return (
    <div className="App">
      <h2>Dictionary</h2>
      <SearchBar action={handleFormSubmit} />
      {returnedWord && <DictionaryCard returnedWord={returnedWord} />}
    </div>
  );
};
