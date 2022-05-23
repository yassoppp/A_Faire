import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "../App.css";
export default function Todo({ todo, idex, onDelete, onModified }) {
  console.log(idex);
  return (
    <div>
      <li className="list-group-item" className="todo-row">
        {todo}
        <div className="DeleteButton">
          <IconButton aria-label="delete" size="small" onClick={()=>onModified(idex)}>
            <ModeIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDelete(idex)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </li>
    </div>
  );
}
