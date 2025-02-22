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
  const hasSourceUrls = Array.isArray(sourceUrls)
    ? sourceUrls.join(", ")
    : sourceUrls;

  return (
    <div className="dictionary__card">
      {wordData && (
        <>
          <p>{t(word)}</p>
          {phonetics && <p>{t(phonetics)}</p>}
          {partOfSpeech && <h3>{t(partOfSpeech)}</h3>}
          <>
            <small className="meaning">{t(Texts.meaning)}</small>
            <ol>
              {first3Definitions.map((definition) => (
                <li key={definition.definition}>{t(definition.definition)}</li>
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
          {sourceUrls.length > 0 && (
            <div className="word__source">
              <span>{t(Texts.source)}:</span>
              <a href={hasSourceUrls} target="_blank" rel="noopener noreferrer">
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
