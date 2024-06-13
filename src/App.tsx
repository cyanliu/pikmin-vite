import React, { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import bigOlObj from "./challenge_helper";
import StepPicker from "./components/StepPicker";
import FilterContainer from "./components/FilterContainer";

function App() {
  const [currStageStep, setcurrStageStep] = useState<string>("1.1");

  const [showWalkTasks, setShowWalkTasks] = useState<boolean>(true);
  const [showPikminTasks, setShowPikminTasks] = useState<boolean>(true);
  const [showExpeditionTasks, setShowExpeditionTasks] = useState<boolean>(true);
  const [showMushroomTasks, setShowMushroomTasks] = useState<boolean>(true);
  const [showFlowerTasks, setShowFlowerTasks] = useState<boolean>(true);

  // future features:
  // 1. find which flower is good to use for the any challenges, and provide
  //    that as an on-hover tooltip
  // 2. filter out task types?

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pikmin Monthly Challenge</h1>
        </header>
      </div>

      <div className="body">
        <StepPicker setcurrStageStep={setcurrStageStep}></StepPicker>

        <FilterContainer
          showExpeditionTasks={showExpeditionTasks}
          showFlowerTasks={showFlowerTasks}
          showMushroomTasks={showMushroomTasks}
          showPikminTasks={showPikminTasks}
          showWalkTasks={showWalkTasks}
          setShowExpeditionTasks={setShowExpeditionTasks}
          setShowFlowerTasks={setShowFlowerTasks}
          setShowMushroomTasks={setShowMushroomTasks}
          setShowPikminTasks={setShowPikminTasks}
          setShowWalkTasks={setShowWalkTasks}
        ></FilterContainer>
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
