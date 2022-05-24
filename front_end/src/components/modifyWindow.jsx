import React from "react";
import Input from "./Input";
export default function ModifyWindow({
  index,
  setModified,
  liste_movies,
  set_list_movies,
}) {
  return (
    <div>
      <h1>Vous voulez Modifiez la tache :</h1>
      <h1>{liste_movies[index]}</h1>
      <h1>Par :</h1>
      <Input
        liste_movies={liste_movies}
        set_list_movies={set_list_movies}
        modified={true}
        index={index}
        setModified={setModified}
      />
    </div>
  );
}
