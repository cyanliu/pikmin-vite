import React, { ReactElement, ReactNode, useState } from "react";
import { ActionType, Task, allTasks } from "../challenge_helper";

type StageProps = {
  stageNum: number;
  currStageStep: string;
};

var test: { [key: string]: string[] } = {
  "1.1": ["Walk 1000 steps"],
  "1.2": ["Grow 2 Pikmin"],
  "1.3": ["Complete 2 Expeditions"],
  "1.4": ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  "2.1": ["something else"],
};

export default function Stage({ stageNum, currStageStep }: StageProps) {
  /* stages have 4 steps with n number of goals per step */

  let initialStep = (stageNum - 1) * 4;
  let finalStep = stageNum * 4 - 1;
  let subsetTasks: Task[][] = [];
  for (let step = initialStep; step <= finalStep; step++) {
    let goalList: Task[] = [];
    for (let goalIndex = 0; goalIndex < allTasks[step].length; goalIndex++) {
      goalList.push(allTasks[step][goalIndex]);
    }
    subsetTasks.push(goalList);
  }

  let currStage = currStageStep.split(".")[0];
  let currStep = currStageStep.split(".")[1];

  return (
    <>
      <div className={"stage" + stageNum}>
        <div
          className={
            "stage-name " + (currStage === String(stageNum) ? "selected" : "")
          }
        >
          <h2>Stage {stageNum}</h2>
        </div>
        <div className="steps-container">
          {subsetTasks.map((goalsInStep, idx) => {
            let goals: ReactElement[] = [];
            for (let goal of goalsInStep) {
              let goalLabel: String = goal.label;

              goals.push(
                <div className="goal">
                  <span className="">{goalLabel}</span>
                </div>
              );
            }
            return (
              <>
                <div
                  className={
                    "step " +
                    (currStage === String(stageNum) &&
                    currStep === String(idx + 1)
                      ? "selected"
                      : "")
                  }
                >
                  {goals}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
