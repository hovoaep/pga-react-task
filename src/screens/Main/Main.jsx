import React, { Component } from "react";
import { ScoreForm, ScoreTabel } from "containers";
import { LocaleStorageUtils } from "utils";
import { LSKey } from "_constants";

export class Main extends Component {
  state = {
    scoreData: [],
    initialValues: {},
    edit: false,
  };

  componentDidMount() {
    const { LSget } = LocaleStorageUtils;
    LSget(LSKey) &&
      this.setState(() => ({ scoreData: JSON.parse(LSget(LSKey)) }));
  }

  updateScoreData = data => {
    const { LSget } = LocaleStorageUtils;
    const {
      state: { edit },
    } = this;
    if (edit) {
      LSget(LSKey) &&
        this.setState(() => ({
          scoreData: JSON.parse(LSget(LSKey)),
          initialValues: {},
          edit: false,
        }));
      return;
    }
    this.setState(({ scoreData }) => ({
      scoreData: [...scoreData, data],
    }));
  };

  clearInitialValues = () => {
    this.setState(() => ({
      initialValues: {},
      edit: false,
    }));
  };

  editSingleScore = id => {
    const { LSget } = LocaleStorageUtils;
    const fieldsValue = JSON.parse(LSget(LSKey)).find(score => score.id === id);
    this.setState(() => ({ initialValues: fieldsValue, edit: true }));
  };

  deleteSingleScore = id => {
    const { LSget, LSupdate } = LocaleStorageUtils;
    const scoreData = LSget(LSKey) && JSON.parse(LSget(LSKey));
    const filterdScoreData = scoreData.filter(score => score.id !== id);
    this.setState(() => ({ scoreData: filterdScoreData }));
    LSupdate(LSKey, JSON.stringify(filterdScoreData));
  };

  render() {
    const {
      state: { scoreData, initialValues, edit },
      updateScoreData,
      deleteSingleScore,
      editSingleScore,
      clearInitialValues,
    } = this;
    return (
      <div className="row">
        <div className="col-12">
          <div className="mb-4">
            <h1 className="text-center">Welcome to PGA scoreboard task</h1>
          </div>
          <ScoreTabel
            scoreData={scoreData}
            deleteSingleScore={deleteSingleScore}
            editSingleScore={editSingleScore}
          />
          <ScoreForm
            clearInitialValues={clearInitialValues}
            initialValues={initialValues}
            updateScoreData={updateScoreData}
            edit={edit}
          />
        </div>
      </div>
    );
  }
}
