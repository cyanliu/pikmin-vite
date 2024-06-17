import React, { ReactNode, useState } from "react";

type SettingsContainerProps = {
  showExpeditionTasks: boolean;
  showFlowerTasks: boolean;
  showMushroomTasks: boolean;
  showPikminTasks: boolean;
  showWalkTasks: boolean;
  setShowExpeditionTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFlowerTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMushroomTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPikminTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWalkTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrStageStep: React.Dispatch<React.SetStateAction<string>>;
};

export default function SettingsContainer({
  showExpeditionTasks,
  showFlowerTasks,
  showMushroomTasks,
  showPikminTasks,
  showWalkTasks,
  setShowExpeditionTasks,
  setShowFlowerTasks,
  setShowMushroomTasks,
  setShowPikminTasks,
  setShowWalkTasks,
  setcurrStageStep,
}: SettingsContainerProps) {
  return (
    <>
      <div className="settings-container">
        <div className="inputs">
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
        <div className="filters-container">
          <div className="filters">
            <input
              type="checkbox"
              id="pikmin-task"
              name="pikmin"
              checked={showPikminTasks}
              onChange={() => {
                setShowPikminTasks(!showPikminTasks);
              }}
            />
            <label htmlFor="pikmin-task">Pikmin</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="expedition-task"
              name="expedition"
              checked={showExpeditionTasks}
              onChange={() => {
                setShowExpeditionTasks(!showExpeditionTasks);
              }}
            />
            <label htmlFor="expedition-task">Expedition</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="walk-task"
              name="walk"
              checked={showWalkTasks}
              onChange={() => {
                setShowWalkTasks(!showWalkTasks);
              }}
            />
            <label htmlFor="walk-task">Walk</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="flower-task"
              name="flower"
              checked={showFlowerTasks}
              onChange={() => {
                setShowFlowerTasks(!showFlowerTasks);
              }}
            />
            <label htmlFor="flower-task">Flower</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="mushroom-task"
              name="mushroom"
              checked={showMushroomTasks}
              onChange={() => {
                setShowMushroomTasks(!showMushroomTasks);
              }}
            />
            <label htmlFor="mushroom-task">Mushroom</label>
          </div>
        </div>
      </div>
    </>
  );
}
