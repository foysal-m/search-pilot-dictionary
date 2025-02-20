import React from "react";
import { useTranslation } from "react-i18next";

import Texts from "../locales/dictionary.json";
import "./SearchBar.scss";

type SearchBarPropType = {
  action: (formData: FormData) => void;
};

export const SearchBar = ({ action }: SearchBarPropType) => {
  const { t } = useTranslation();

  return (
    <form action={action} className="form">
      <input
        type="text"
        name="word"
        className="form__input"
        placeholder={t(Texts.inputPlaceHolder)}
      />
      <button type="submit" className="form__submit">
        🔍
      </button>
    </form>
  );
};
