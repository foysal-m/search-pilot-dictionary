import React from "react";
import { useTranslation } from "react-i18next";
import { ReturnedWordType } from "../types/words.types";
import Texts from "../locales/dictionary.json";
import "./DictionaryCard.scss";

type DictionaryCardProp = {
  wordData: ReturnedWordType;
};

export const DictionaryCard = ({ wordData }: DictionaryCardProp) => {
  const { t } = useTranslation();
  const { word, phonetics, meanings, sourceUrls } = wordData;

  const [firstMeaning] = meanings;
  const { partOfSpeech, definitions, synonyms } = firstMeaning;

  const first3Definitions = definitions.slice(0, 3);
  const hasSynonyms = Array.isArray(synonyms) && synonyms.length > 0;
  const first2Synonyms = hasSynonyms && synonyms.slice(0, 2);

  return (
    <div className="dictionary__card">
      {wordData && (
        <>
          <p>{t(word)}</p>
          {phonetics && <p>{t(phonetics)}</p>}
          {partOfSpeech && (
            <p className="parts__of__speech">{t(partOfSpeech)}</p>
          )}
          <>
            <small className="meaning">{t(Texts.meaning)}</small>
            <ol>
              {first3Definitions.map((definition, index) => (
                <li key={index}>{t(definition.definition)}</li>
              ))}
            </ol>
          </>
          {first2Synonyms && (
            <>
              <strong>{t(Texts.synonyms)}</strong>
              <span className="word__synonyms">
                {t(first2Synonyms.join(", "))}
              </span>
            </>
          )}
          {sourceUrls && (
            <div className="word__source">
              <span>{t(Texts.source)}:</span>
              <a href={sourceUrls} target="_blank" rel="noopener noreferrer">
                {/* Passing sourceUrls via a JSON variable because `t()` removes anything before the colon (:), 
              which would strip out the "https:" part of the URL if passed directly. */}
                “{t(Texts.sourceUrls, { sourceUrls })}”
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};
