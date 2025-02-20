import React from "react";
import "./SearchBar.scss";

type SearchBarPropType = {
  action: (formData: FormData) => void;
};

export const SearchBar = ({ action }: SearchBarPropType) => {
  return (
    <form action={action} className="form">
      <input
        type="text"
        name="word"
        className="form__input"
        placeholder="Start typing any word"
      />
      <button type="submit" className="form__submit">
        🔍
      </button>
    </form>
  );
};
