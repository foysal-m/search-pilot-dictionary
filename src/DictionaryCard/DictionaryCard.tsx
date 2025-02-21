import React from "react";
import { ReturnedWordType } from "../types/words.types";
import "./DictionaryCard.scss";

type DictionaryCardProp = {
  wordData: ReturnedWordType;
};

export const DictionaryCard = ({ wordData }: DictionaryCardProp) => {
  const { word, phonetics, meanings, sourceUrls } = wordData;

  const [firstMeaning] = meanings;
  const { partOfSpeech, definitions, synonyms } = firstMeaning;

  const first3Definitions = definitions.slice(0, 3);
  const hasSynonyms = Array.isArray(synonyms) && synonyms.length > 0;
  const first2Synonyms = hasSynonyms && synonyms.slice(0, 2);
  const hasSourceUrls = Array.isArray(sourceUrls)
    ? sourceUrls.join(", ")
    : sourceUrls;

  return (
    <div className="dictionary__card">
      {wordData && (
        <>
          <p>{word}</p>
          <p>{phonetics}</p>
          {partOfSpeech && (
            <div>
              <h3>{partOfSpeech}</h3>
            </div>
          )}
          <>
            <small className="meaning">meaning</small>
            <ol>
              {first3Definitions.map((definition) => (
                <li key={definition.definition}>{definition.definition}</li>
              ))}
            </ol>
          </>
          {first2Synonyms && (
            <>
              <strong>synonyms</strong>
              <span className="word__synonyms">
                {first2Synonyms.join(", ")}
              </span>
            </>
          )}
          {sourceUrls.length > 0 && (
            <div className="word__source">
              <span>source: </span>
              <a href={hasSourceUrls} target="_blank" rel="noopener noreferrer">
                “{sourceUrls}”
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};
