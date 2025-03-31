import React from "react";

type SettingsContainerProps = {
  numTickets: number;
  onSettingChange: any;
  setcurrStageStep: React.Dispatch<React.SetStateAction<string>>;
  setNumTickets: React.Dispatch<React.SetStateAction<number>>;
};

export default function SettingsContainer({
  numTickets,
  onSettingChange,
  setcurrStageStep,
  setNumTickets,
}: SettingsContainerProps) {
  const idToIdxMapping: { [inputId: string]: number } = {
    "expedition-task": 0,
    "flower-task": 1,
    "mushroom-task": 2,
    "pikmin-task": 3,
    "walk-task": 4,
  };

  //todo: type these
  function handleClick(id: string): any {
    let idx = idToIdxMapping[id];
    onSettingChange(idx);
  }

  return (
    <>
      <div className="settings-container">
        <div className="curr-step-container">
          <div>
            <label htmlFor="current-step">Current Step:</label>
            <select
              id="current-step"
              onChange={(event) => {
                let stepGoal = event.currentTarget.value;
                setcurrStageStep(stepGoal);
              }}
            >
              <option value={"1.1"}>1.1</option>
              <option value={"1.2"}>1.2</option>
              <option value={"1.3"}>1.3</option>
              <option value={"1.4"}>1.4</option>
              <option value={"2.1"}>2.1</option>
              <option value={"2.2"}>2.2</option>
              <option value={"2.3"}>2.3</option>
              <option value={"2.4"}>2.4</option>
              <option value={"3.1"}>3.1</option>
              <option value={"3.2"}>3.2</option>
              <option value={"3.3"}>3.3</option>
              <option value={"3.4"}>3.4</option>
              <option value={"4.1"}>4.1</option>
              <option value={"4.2"}>4.2</option>
              <option value={"4.3"}>4.3</option>
              <option value={"4.4"}>4.4</option>
            </select>
          </div>
          <div>
            <label htmlFor="tickets-input">Extra tickets:</label>
            <input
              type="number"
              id="tickets-input"
              onChange={(event) => {
                setNumTickets(parseInt(event.target.value));
              }}
              value={numTickets}
              min={0}
            ></input>
          </div>
        </div>
        <div className="filters-container">
          <div className="filters">
            <input
              type="checkbox"
              id="expedition-task"
              name="expedition"
              onChange={(event) => {
                handleClick(event.target.id);
              }}
            />
            <label htmlFor="expedition-task">Expedition</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="flower-task"
              name="flower"
              onChange={(event) => {
                handleClick(event.target.id);
              }}
            />
            <label htmlFor="flower-task">Flower</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="mushroom-task"
              name="mushroom"
              onChange={(event) => {
                handleClick(event.target.id);
              }}
            />
            <label htmlFor="mushroom-task">Mushroom</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="pikmin-task"
              name="pikmin"
              onChange={(event) => {
                handleClick(event.target.id);
              }}
            />
            <label htmlFor="pikmin-task">Pikmin</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="walk-task"
              name="walk"
              onChange={(event) => {
                handleClick(event.target.id);
              }}
            />
            <label htmlFor="walk-task">Walk</label>
          </div>
        </div>
      </div>
    </>
  );
}
