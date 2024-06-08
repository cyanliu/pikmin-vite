import React, { ReactNode, useState } from "react";

type StageProps = {
  stageNum: number;
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
