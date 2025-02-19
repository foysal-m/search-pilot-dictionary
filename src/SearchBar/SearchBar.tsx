import React from "react";
import "./SearchBar.scss";

export const SearchBar = ({
  action,
}: {
  action: (formData: FormData) => void;
}) => {
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
