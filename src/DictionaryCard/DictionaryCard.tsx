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

  //t("translation:user.form", { dynamicValue: "Some value or variable" });

  return (
    <div className="dictionary__card">
      {wordData && (
        <>
          <p>{t(Texts.word, { word })}</p>
          <p>{phonetics}</p>
          {partOfSpeech && (
            <div>
              <h3>{t(Texts.partOfSpeech, { partOfSpeech })}</h3>
            </div>
          )}
          <>
            <small className="meaning">{t(Texts.meaning)}</small>
            <ol>
              {first3Definitions.map((definition) => (
                <li key={definition.definition}>
                  {t(Texts.definition, { definition: definition.definition })}
                </li>
              ))}
            </ol>
          </>
          {first2Synonyms && (
            <>
              <strong>{t(Texts.synonyms)}</strong>
              <span className="word__synonyms">
                {t(Texts.first2Synonyms, {
                  first2Synonyms: first2Synonyms.join(", "),
                })}
              </span>
            </>
          )}
          {sourceUrls.length > 0 && (
            <div className="word__source">
              <span>{t(Texts.source)}:</span>
              <a href={hasSourceUrls} target="_blank" rel="noopener noreferrer">
                “{t(Texts.sourceUrls, { sourceUrls })}”
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};
