import React, { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import bigOlObj from "./challenge_helper";
import StepPicker from "./components/StepPicker";

function App() {
  const [currStageStep, setcurrStageStep] = useState<string>("1.1");

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pikmin Monthly Challenge</h1>
        </header>
      </div>

      <StepPicker setcurrStageStep={setcurrStageStep}></StepPicker>

      <div className="body">
        <div className="stage-container">
          <Stage
            stageNum={1}
            stageGoals={bigOlObj}
            currStageStep={currStageStep}
          ></Stage>
          <Stage
            stageNum={2}
            stageGoals={bigOlObj}
            currStageStep={currStageStep}
          ></Stage>
          <Stage
            stageNum={3}
            stageGoals={bigOlObj}
            currStageStep={currStageStep}
          ></Stage>
          <Stage
            stageNum={4}
            stageGoals={bigOlObj}
            currStageStep={currStageStep}
          ></Stage>
        </div>
      </div>
    </>
  );
}

export default App;
