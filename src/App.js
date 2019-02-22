import React, { Component } from "react";
import { Main } from "./screens/Main";
// import { BoziTxa } from "./components/BoziTxa";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        {/* <BoziTxa /> */}
        <Main />
      </div>
    );
  }
}

export default App;
