import React, { ReactNode, useState } from "react";
import { MyObject } from "../App";

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
  var stepsSequence: string[][] = [];

  for (let c = 1; c <= 4; c++) {
    let idx = stageNum + "." + c;
    stepsSequence.push(stageGoals[idx]);
  }

  console.log(stepsSequence);
  return (
    <>
      <div className={"stage" + stageNum}>
        <div className="stage-name">Stage {stageNum}</div>
        <div className="steps-container">
          {stepsSequence.map((goalsInStep, idx) => {
            let goalRows = [];
            for (let goal of goalsInStep) {
              goalRows.push(<div className="goal">{goal}</div>);
            }
            return (
              <>
                <div className="step">{goalRows}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
