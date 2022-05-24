import React, { useState } from "react";
import Todo from "./Todo";
export default function Todolist({ liste_movies, onDelete, onModified }) {
  if (liste_movies.length === 0) {
    return null;
  }
  return (
    <div>
      <ul className="list-group">
        {liste_movies.map((todo, index) => {
          return (
            <Todo
              todo={todo}
              idex={index}
              onDelete={onDelete}
              key={index}
              onModified={onModified}
            />
          );
        })}
      </ul>
    </div>
  );
}
