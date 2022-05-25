import React, { useState } from "react";
import { ethers } from "ethers";

export default function Input({
  set_list_movies,
  liste_movies,
  modified,
  index,
  setModified,
  contract,
}) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    if (modified !== true) {
      if (text.replace(/\s/g, "").length === 0) {
        e.preventDefault();
        setText("");
        return null;
      }
      e.preventDefault();
      const tx_add = await contract.add_liste_de_tache(text);
      await tx_add.wait();
      const new_tab = await contract.get_liste_de_taches();
      set_list_movies(new_tab);
      setText("");
    } else {
      if (text.replace(/\s/g, "").length === 0) {
        e.preventDefault();
        setModified(false);
        return null;
      }
      e.preventDefault();
      const tx_add = await contract.modify_liste_taches(text, index);
      await tx_add.wait();
      const new_tab = await contract.get_liste_de_taches();
      set_list_movies(new_tab);
      setText("");
      setModified(false);
    }
  };
  console.log(index);
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
