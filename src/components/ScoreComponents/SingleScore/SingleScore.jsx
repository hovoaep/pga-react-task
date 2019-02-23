import React from "react";
import { Button } from "components";
import "./SingleScore.scss";

export function SingleScore({
  name,
  surname,
  score,
  id,
  deleteSingleScore,
  editSingleScore,
}) {
  const deleteScore = () => {
    deleteSingleScore(id);
  };

  const editScore = () => {
    editSingleScore(id);
  };
  return (
    <tr className="single-score-item">
      <td>
        {surname} {name}
      </td>
      <td>{score}</td>
      <td>
        <Button text="Delete" type="danger" onClick={deleteScore} />
        <Button text="Edit" type="primary" onClick={editScore} />
      </td>
    </tr>
  );
}
