import React, { useState } from "react";
import Input from "./Input";
import Todolist from "./Todolist";
import ModifyWindow from "./modifyWindow";
export default function Main() {
  const [modified, setModified] = useState(false);
  const [liste_movies, set_list_movies] = useState([]);
  const [id_modified, setIdModified] = useState(0);
  const handleDelete = (id) => {
    const new_list = [...liste_movies].filter(
      (movie) => liste_movies.indexOf(movie) !== id
    );
    set_list_movies(new_list);
  };
  const handleModified = (id) => {
    setModified(true);
    setIdModified(id);
  };
  return modified === false ? (
    <div>
      <h1>Wachouganado ?</h1>
      <Input set_list_movies={set_list_movies} liste_movies={liste_movies} />
      <Todolist
        liste_movies={liste_movies}
        onDelete={handleDelete}
        onModified={handleModified}
      />
    </div>
  ) : (
    <ModifyWindow
      index={id_modified}
      setModified={setModified}
      liste_movies={liste_movies}
      set_list_movies={set_list_movies}
    />
  );
}
