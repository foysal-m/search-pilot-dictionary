import React from "react";
import { ReturnedWordType } from "../types/words.types";

import "./DictionaryCard.scss";

export const DictionaryCard = ({
  wordData,
}: {
  wordData: ReturnedWordType;
}) => {
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
        <div>
          <p>{word}</p>
          <p>{phonetics}</p>
          {partOfSpeech && (
            <div>
              <h3>{partOfSpeech}</h3>
            </div>
          )}
          <div>
            <p>meaning</p>
            <ol>
              {first3Definitions.map((definition) => (
                <li key={definition.definition}>{definition.definition}</li>
              ))}
            </ol>
          </div>
          {first2Synonyms && (
            <div>
              <strong>synonyms: </strong>
              {first2Synonyms.join(", ")}
            </div>
          )}
          {sourceUrls.length > 0 && (
            <div className="word__source">
              <span>source: </span>
              <a href={hasSourceUrls} target="_blank" rel="noopener noreferrer">
                {sourceUrls}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
