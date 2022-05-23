import React, { useState } from "react";

export default function Input({
  set_list_movies,
  liste_movies,
  modified,
  index,
  setModified,
}) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    if (modified !== true) {
      if (text.replace(/\s/g, "").length === 0) {
        e.preventDefault();
        return null;
      }
      e.preventDefault();
      const new_tab = [text, ...liste_movies];
      set_list_movies(new_tab);
      setText("");
    } else {
      if (text.replace(/\s/g, "").length === 0) {
        e.preventDefault();
        return null;
      }
      e.preventDefault();
      const new_tab = [...liste_movies];
      new_tab[index] = text;
      set_list_movies(new_tab);
      setModified(false);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="todo-input"
        />
        <button type="submit" className="Add">
          {modified !== true ? "Add" : "Modify"}
        </button>
      </form>
    </div>
  );
}
