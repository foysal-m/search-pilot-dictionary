import React, { JSX } from "react";
import { WordTypes } from "../types/words.types";

export const DictionaryCard = ({
  returnedWord,
}: {
  returnedWord: WordTypes;
}) => {
  return (
    <div className="dictionary-card">
      {returnedWord && (
        <div>
          <p>{returnedWord.word}</p>
          <p>{returnedWord.phonetics}</p>
          <div>
            <h3>{returnedWord.meanings?.partOfSpeech}</h3>
          </div>
          <div>
            <p>meaning: </p>
            <ol>
              {returnedWord.meanings.definitions
                .slice(0, 3)
                .map((definition) => (
                  <li key={definition.definition}>{definition.definition}</li>
                ))}
            </ol>
          </div>
          <div>
            <p>
              <strong>Synonyms: </strong>
              {returnedWord.meanings.synonyms.slice(0, 2).join(", ")}
            </p>
          </div>
          <div>
            <span>Source: </span>
            <a href={returnedWord.sourceUrls} target="_blank">
              {returnedWord.sourceUrls}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
