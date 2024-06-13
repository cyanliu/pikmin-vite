import React, { ReactNode, useState } from "react";

type FilterContainerProps = {
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
};

export default function FilterContainer({
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
}: FilterContainerProps) {
  return (
    <>
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
    </>
  );
}
