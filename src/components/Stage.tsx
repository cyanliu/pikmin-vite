import React, { ReactNode, useState } from "react";
import { MyObject } from "../App";

type StageProps = {
  stageNum: number;
  stageGoals: MyObject;
};

var test = {
  "1.1": ["Walk 1000 steps"],
  "1.2": ["Grow 2 Pikmin"],
  "1.3": ["Complete 2 Expeditions"],
  "1.4": ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  "2.1": ["something else"],
};

export default function Stage({ stageNum }: StageProps) {
  return (
    <>
      <div className={"stage" + stageNum}>
        <div className="stage-name">Stage {stageNum}</div>
        <div className="steps-container">
          <div className="step">
            <div className="goal">a</div>
          </div>
          <div className="step">
            <div className="goal">a</div>
          </div>
          <div className="step">
            <div className="goal">a</div>
          </div>
          <div className="step">
            <div className="goal">a</div>
            <div className="goal">a</div>
          </div>
        </div>
      </div>
    </>
  );
}
