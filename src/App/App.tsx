import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SearchBar } from "../SearchBar/SearchBar";
import { DictionaryCard } from "../DictionaryCard/DictionaryCard";
import { useDictionary } from "../Hooks/useDictionary";
import Texts from "../locales/dictionary.json";
import ".././i18n";
import "./App.scss";

export const App = () => {
  const [isClient, setIsClient] = useState(false);

  const [word, setWord] = useState("");
  const { t } = useTranslation();

  const { data: words, isLoading, isError, error } = useDictionary(word);

  const handleFormSubmit = (formData: FormData) => {
    const word = formData.get("word") as string;

    if (word) {
      setWord(word.trim());
    }
  };

  useEffect(() => {
    // Ensure that the component only renders on the client
    setIsClient(true);
  }, []);

  const isFirstWordPresent = words && words[0];
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
      {isClient && process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <h2>{t(Texts.title)}</h2>
      <SearchBar action={handleFormSubmit} />
      {isError && !isLoading && word && (
        <div className="error">{error.message}</div>
      )}
      {isLoading && word && <p>Loading...</p>}
      {!isLoading && wordData && <DictionaryCard wordData={wordData} />}
    </div>
  );
};
