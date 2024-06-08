import React from "react";
import "./App.scss";
import Stage from "./components/Stage";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pikmin Monthly Challenge</h1>
        </header>
      </div>
      <div className="body">
        <div className="stage-container">
          <Stage stageNum={1}></Stage>
          <Stage stageNum={2}></Stage>
          <Stage stageNum={3}></Stage>
          <Stage stageNum={4}></Stage>
        </div>
      </div>
    </>
  );
}

export default App;
