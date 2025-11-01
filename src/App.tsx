import "./App.scss";
import Stage from "./components/Stage";
import SettingsContainer from "./components/SettingsContainer";
import { totalMushies } from "./challenge_helper";
import pikminLads from "./assets/pikmin.png";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import TotalsContainer from "./components/TotalsContainer";

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
    combine({ filterSettings: Array(5).fill(true) }, (set) => {
      return {
        setNewSettings: (newFilters: boolean[]) => {
          set(() => ({ filterSettings: newFilters }));
        },
      };
    })
  )
);

const useCurrentProgressStore = create(
  combine(
    { currentStep: "1.1", ticketCount: 0, mushiesRemaining: 3 },
    (set) => {
      return {
        setCurrentStep: (nextCurrentStep: string) => {
          set(() => ({
            currentStep: nextCurrentStep,
          }));
        },
        setTicketCount: (nextTicketCount: number) => {
          set(() => ({
            ticketCount: nextTicketCount,
          }));
        },
        setMushiesRemaining: (nextMushiesRemaining: number) => {
          set(() => ({
            mushiesRemaining: nextMushiesRemaining,
          }));
        },
      };
    }
  )
);

function App() {
  const filterSettings = useFilterSettingsStore(
    (state) => state.filterSettings
  );
  const setFilterSettings = useFilterSettingsStore(
    (state) => state.setNewSettings
  );

  const currentProgress = useCurrentProgressStore();

  const setCurrentStep = useCurrentProgressStore(
    (state) => state.setCurrentStep
  );

  const setTicketCount = useCurrentProgressStore(
    (state) => state.setTicketCount
  );

  const setMushiesRemaining = useCurrentProgressStore(
    (state) => state.setMushiesRemaining
  );

  // todo: type these

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
      setCurrentStep(val);
    } else if (settingType === "ticket") {
      setTicketCount(Number(val));
    } else if (settingType === "mushies") {
      setMushiesRemaining(Number(val));
    } else {
      return;
    }
  }
  // future features:
  // 1. find which flower is good to use for the any challenges, and provide
  //    that as an on-hover tooltip
  // 2. filter out task types?
  // 3. actually implement totalDays

  // TODO: recalculate total mushies based on current step
  const ticketCount = currentProgress.ticketCount;
  let totalDays = Math.floor(
    (totalMushies - ticketCount - currentProgress.mushiesRemaining) / 3
  );

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
          filterState={filterSettings}
          currentProgress={currentProgress}
        ></SettingsContainer>
        <TotalsContainer
          totalMushies={totalMushies}
          totalDays={totalDays}
        ></TotalsContainer>
        <div className="stage-container">
          {[1, 2, 3, 4].map((num) => {
            return (
              <Stage
                stageNum={num}
                currStageStep={currentProgress.currentStep}
                showExpeditionTasks={filterSettings[0]}
                showFlowerTasks={filterSettings[1]}
                showMushroomTasks={filterSettings[2]}
                showPikminTasks={filterSettings[3]}
                showWalkTasks={filterSettings[4]}
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
