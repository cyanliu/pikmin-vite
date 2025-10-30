import { useState } from "react";
import "./App.scss";
import Stage from "./components/Stage";
import SettingsContainer from "./components/SettingsContainer";
import { totalMushies } from "./challenge_helper";
import pikminLads from "./assets/pikmin.png";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// https://zustand.docs.pmnd.rs/guides/typescript
// interface TaskSettingsState {
//   taskSettings: boolean[];
//   setNewSettings: (by: boolean[]) => void;
// }

// Task Settings
// Filter for specific type of tasks
// Expedition | Flower | Mushroom | Pikmin | Walk
const useFilterSettingsStore = create(
  devtools(
    combine({ filterSettings: Array(5).fill(false) }, (set) => {
      return {
        setNewSettings: (newFilters: boolean[]) => {
          set(() => ({ filterSettings: newFilters }));
        },
      };
    })
  )
);

// const useCurrentProgressStore = create(
//   combine(
//     { currentStep: "1.1", ticketCount: 0, mushiesRemaining: 3 },
//     (set) => {
//       return {
//         setCurrentStep: (nextCurrentStep) => {
//           set((state) => ({
//             currentStep:
//               typeof nextCurrentStep === "function"
//                 ? nextCurrentStep(state.currentStep)
//                 : nextCurrentStep,
//           }));
//         },
//         setTicketCount: (nextTicketCount) => {
//           set((state) => ({
//             currentStep:
//               typeof nextTicketCount === "function"
//                 ? nextTicketCount(state.ticketCount)
//                 : nextTicketCount,
//           }));
//         },
//         setMushiesRemaining: (nextMushiesRemaining: string) => {
//           set((state) => ({
//             currentStep:
//               typeof nextMushiesRemaining === "function"
//                 ? nextMushiesRemaining(state.mushiesRemaining)
//                 : nextMushiesRemaining,
//           }));
//         },
//       };
//     }
//   )
// );

function App() {
  const [currStageStep, setcurrStageStep] = useState<string>("1.1");

  // todo: rm after implementing zustand, <Stage> component uses these
  const [showWalkTasks, setShowWalkTasks] = useState<boolean>(true);
  const [showPikminTasks, setShowPikminTasks] = useState<boolean>(true);
  const [showExpeditionTasks, setShowExpeditionTasks] = useState<boolean>(true);
  const [showMushroomTasks, setShowMushroomTasks] = useState<boolean>(true);
  const [showFlowerTasks, setShowFlowerTasks] = useState<boolean>(true);

  const filterSettings = useFilterSettingsStore(
    (state) => state.filterSettings
  );
  const setFilterSettings = useFilterSettingsStore(
    (state) => state.setNewSettings
  );

  // todo: type these
  // rece

  // Handles click on a given filter (Expedition | Flower | Mushroom | Pikmin | Walk)
  // updating array based on idx passed when handleFilterSettingChange was called
  // in SettingsContainer
  // i.e. click on Mushroom input tells settingsContainer this is at idx 2
  // and this function redefines the boolean array
  function handleFilterSettingChange(idx: number): void {
    // create shallow copy of old filter settings with arr.slice() so we can use
    // it as a reference to update in the new one
    let updatedFilterSettings = filterSettings.slice();
    updatedFilterSettings[idx] = !updatedFilterSettings[idx];
    setFilterSettings(updatedFilterSettings);
  }

  function handleCurrentProgressChange(settingType: string, val: string): void {
    if (settingType === "step") {
      console.log("step", val);
    } else if (settingType === "ticket") {
    } else if (settingType === "mushies") {
    } else {
      return;
    }
  }
  // future features:
  // 1. find which flower is good to use for the any challenges, and provide
  //    that as an on-hover tooltip
  // 2. filter out task types?
  // 3. actually implement totalDays

  // const ticketCount = useCurrentProgressStore((state) => state.ticketCount);
  // let totalDays = Math.floor((totalMushies - ticketCount) / 3);

  const ticketCount = 0;
  let totalDays = 13;
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
          onSettingsChange={handleFilterSettingChange}
          onCurrentProgressChange={handleCurrentProgressChange}
          ticketCount={ticketCount}
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
