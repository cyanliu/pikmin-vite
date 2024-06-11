import React, { ReactElement, ReactNode, useState } from "react";
import { TaskType, MyObject } from "../challenge_helper";

type StageProps = {
  stageNum: number;
  stageGoals: MyObject;
  currStageStep: string;
};

var test: { [key: string]: string[] } = {
  "1.1": ["Walk 1000 steps"],
  "1.2": ["Grow 2 Pikmin"],
  "1.3": ["Complete 2 Expeditions"],
  "1.4": ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  "2.1": ["something else"],
};

export default function Stage({
  stageNum,
  stageGoals,
  currStageStep,
}: StageProps) {
  /* stages have 4 steps with n number of goals per step */
  var steps: string[][] = [];

  for (let c = 1; c <= 4; c++) {
    let idx = stageNum + "." + c;
    steps.push(stageGoals[idx]);
  }

  let currStage = currStageStep.split(".")[0];
  let currStep = currStageStep.split(".")[1];
  console.log(steps);
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
          {steps.map((goalsInStep, idx) => {
            let goals: ReactElement[] = [];
            for (let goal of goalsInStep) {
              let typedGoal: TaskType = goal.split(" ")[0] as TaskType;

              goals.push(
                <div className="goal">
                  <span className="">{goal}</span>
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
