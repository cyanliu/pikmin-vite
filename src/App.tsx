import { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import SettingsContainer from "./components/SettingsContainer";
import { totalMushies } from "./challenge_helper";
import pikminLads from "./assets/pikmin.png";

function App() {
  const [currStageStep, setcurrStageStep] = useState<string>("1.1");
  const [numTickets, setNumTickets] = useState<number>(0);
  const [numMushies, setNumMushies] = useState<number>(3);

  const [showWalkTasks, setShowWalkTasks] = useState<boolean>(true);
  const [showPikminTasks, setShowPikminTasks] = useState<boolean>(true);
  const [showExpeditionTasks, setShowExpeditionTasks] = useState<boolean>(true);
  const [showMushroomTasks, setShowMushroomTasks] = useState<boolean>(true);
  const [showFlowerTasks, setShowFlowerTasks] = useState<boolean>(true);

  // future features:
  // 1. find which flower is good to use for the any challenges, and provide
  //    that as an on-hover tooltip
  // 2. filter out task types?
  // 3. actually implement totalDays

  let totalDays = Math.floor((totalMushies - numTickets) / 3);
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="doto">Pikmin Pals</h1>
        </header>
      </div>
      <div className="pikmin-header">
        <img
          src={pikminLads}
          id="pikmin-lads"
          alt="A lineup of Pikmin bouncing on top of the contents of the page"
        />
      </div>
      <div className="body">
        <SettingsContainer
          showExpeditionTasks={showExpeditionTasks}
          showFlowerTasks={showFlowerTasks}
          showMushroomTasks={showMushroomTasks}
          showPikminTasks={showPikminTasks}
          showWalkTasks={showWalkTasks}
          numTickets={numTickets}
          setShowExpeditionTasks={setShowExpeditionTasks}
          setShowFlowerTasks={setShowFlowerTasks}
          setShowMushroomTasks={setShowMushroomTasks}
          setShowPikminTasks={setShowPikminTasks}
          setShowWalkTasks={setShowWalkTasks}
          setcurrStageStep={setcurrStageStep}
          setNumTickets={setNumTickets}
        ></SettingsContainer>
        <div className="totals-container">
          <div className="totals-row">
            <span>Total mushies left: {totalMushies}</span>
            <span>Total days required: {totalDays}</span>
          </div>
        </div>
        <div className="stage-container">
          {[1, 2, 3, 4].map((num) => {
            return (
              <>
                <Stage
                  stageNum={num}
                  currStageStep={currStageStep}
                  showExpeditionTasks={showExpeditionTasks}
                  showFlowerTasks={showFlowerTasks}
                  showMushroomTasks={showMushroomTasks}
                  showPikminTasks={showPikminTasks}
                  showWalkTasks={showWalkTasks}
                ></Stage>
              </>
            );
          })}
          <div className="floaty"></div>
        </div>
      </div>
    </>
  );
}

export default App;
