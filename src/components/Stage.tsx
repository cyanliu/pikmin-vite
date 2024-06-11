import React, { ReactElement, ReactNode, useState } from "react";
import { MyObject } from "../challenge_helper";

type StageProps = {
  stageNum: number;
  stageGoals: MyObject;
};

var test: { [key: string]: string[] } = {
  "1.1": ["Walk 1000 steps"],
  "1.2": ["Grow 2 Pikmin"],
  "1.3": ["Complete 2 Expeditions"],
  "1.4": ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  "2.1": ["something else"],
};

export default function Stage({ stageNum, stageGoals }: StageProps) {
  /* stages have 4 steps with n number of goals per step */
  var steps: string[][] = [];

  for (let c = 1; c <= 4; c++) {
    let idx = stageNum + "." + c;
    steps.push(stageGoals[idx]);
  }

  console.log(steps);
  return (
    <>
      <div className={"stage" + stageNum}>
        <div className="stage-name">
          <span>Stage {stageNum}</span>
        </div>
        <div className="steps-container">
          {steps.map((goalsInStep, idx) => {
            let goals: ReactElement[] = [];
            for (let goal of goalsInStep) {
              goals.push(<div className="goal">{goal}</div>);
            }
            return (
              <>
                <div className="step">{goals}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
