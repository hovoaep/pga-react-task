import React, { Component } from "react";
import { SingleScore } from "components";
import { sortScoreData } from "utils";
import "./ScoreTabel.scss";
import UpIcon from "../../up.svg";

export class ScoreTabel extends Component {
  state = {
    up: true,
  };

  changeSortOption = () => {
    this.setState(({ up }) => ({ up: !up }));
  };

  renderScoreData = () => {
    const {
      props: { scoreData, deleteSingleScore, editSingleScore },
    } = this;
    if (scoreData.length) {
      return sortScoreData(scoreData).map(score => (
        <SingleScore
          deleteSingleScore={deleteSingleScore}
          editSingleScore={editSingleScore}
          key={score.id}
          {...score}
        />
      ));
    }
  };
  render() {
    const {
      state: { up },
      props: { scoreData },
      renderScoreData,
      changeSortOption,
    } = this;
    return (
      <div className="mb-4">
        <h2 className="text-center">Player scores</h2>
        {scoreData.length ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">
                  Score{" "}
                  <img
                    className={`up-icon ${up && "active"}`}
                    src={UpIcon}
                    onClick={changeSortOption}
                    alt="Sorting icon"
                  />
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {up ? renderScoreData() : renderScoreData().reverse()}
            </tbody>
          </table>
        ) : (
          <>
            <hr />
            <h3 className="text-center">
              Please add player to see score tabel
            </h3>
            <hr />
          </>
        )}
      </div>
    );
  }
}
