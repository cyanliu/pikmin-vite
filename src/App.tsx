import React, { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import bigOlObj from "./challenge_helper";

function App() {
  const [currStep, setCurrStep] = useState<number>(1);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pikmin Monthly Challenge</h1>
        </header>
      </div>
      <div className="body">
        <div className="stage-container">
          <Stage stageNum={1} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={2} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={3} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={4} stageGoals={bigOlObj}></Stage>
        </div>
      </div>
    </>
  );
}

export default App;
