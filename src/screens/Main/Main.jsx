import React, { Component } from "react";
import { ScoreForm } from "containers";

export class Main extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Welcome to PGA scoreboard task</h1>
        </div>
        <ScoreForm />
      </div>
    );
  }
}
