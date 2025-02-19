import React, { useState } from "react";

import { useWords } from "../Hooks/useWord";
import { SearchBar } from "../SearchBar/SearchBar";

import "./App.scss";
import { DictionaryCard } from "../WordCard/DictionaryCard";

export const App = () => {
  const [word, setWord] = useState("");

  const { data: words } = useWords(word);
  const isFirstWordPresent = words && words[0];

  const handleFormSubmit = (formData: FormData) => {
    const word = formData.get("word") as string;
    if (word) {
      setWord(word.trim());
    }
  };

  const wordData = isFirstWordPresent && {
    word: words[0].word,
    phonetics:
      Array.isArray(words[0].phonetics) && !words[0].phonetic
        ? words[0].phonetics[1]?.text
        : words[0].phonetic,
    meanings: [words[0].meanings[0]],
    sourceUrls: words[0]?.sourceUrls[0],
  };

  return (
    <div className="App">
      <h2>Dictionary</h2>
      <SearchBar action={handleFormSubmit} />
      {wordData && <DictionaryCard wordData={wordData} />}
    </div>
  );
};
