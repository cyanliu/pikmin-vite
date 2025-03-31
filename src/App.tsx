import { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import SettingsContainer from "./components/SettingsContainer";
import { totalMushies } from "./challenge_helper";
import pikminLads from "./assets/pikmin.png";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const useTaskSettingsStore = create(
  combine({ taskSettings: Array(5).fill(false) }, (set) => {
    return {
      setTaskSettings: (nextTaskSettings) => {
        set((state) => ({
          taskSettings:
            typeof nextTaskSettings === "function"
              ? nextTaskSettings(state.taskSettings)
              : nextTaskSettings,
        }));
      },
    };
  })
);

function App() {
  const [currStageStep, setcurrStageStep] = useState<string>("1.1");
  const [numTickets, setNumTickets] = useState<number>(0);
  const [numMushies, setNumMushies] = useState<number>(3);

  const [showWalkTasks, setShowWalkTasks] = useState<boolean>(true);
  const [showPikminTasks, setShowPikminTasks] = useState<boolean>(true);
  const [showExpeditionTasks, setShowExpeditionTasks] = useState<boolean>(true);
  const [showMushroomTasks, setShowMushroomTasks] = useState<boolean>(true);
  const [showFlowerTasks, setShowFlowerTasks] = useState<boolean>(true);

  const taskSettings = useTaskSettingsStore((state) => state.taskSettings);
  const setTaskSettings = useTaskSettingsStore(
    (state) => state.setTaskSettings
  );

  // todo: type these
  function handleTaskSettingChange(idx: number): void {
    const nextTaskSettings = taskSettings.slice();
    nextTaskSettings[idx] = !nextTaskSettings[idx];
    setTaskSettings(nextTaskSettings);
  }
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
          numTickets={numTickets}
          onSettingChange={handleTaskSettingChange}
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
              <Stage
                stageNum={num}
                currStageStep={currStageStep}
                showExpeditionTasks={showExpeditionTasks}
                showFlowerTasks={showFlowerTasks}
                showMushroomTasks={showMushroomTasks}
                showPikminTasks={showPikminTasks}
                showWalkTasks={showWalkTasks}
                key={num}
              ></Stage>
            );
          })}
          <div className="floaty"></div>
        </div>
      </div>
    </>
  );
}

export default App;
