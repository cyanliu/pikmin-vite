import React, { ReactElement, ReactNode, useState } from "react";
import { anyFlowerTasks, Task, allTasks } from "../challenge_helper";

type TaskCellProps = {
  label: string;
  flowerTip?: string | null;
  isCurrentStep: boolean;
};

function TaskCell({ label, flowerTip, isCurrentStep }: TaskCellProps) {
  return (
    <div className={"goal " + (isCurrentStep ? "selected" : "")}>
      <span className="">{label}</span>
      {flowerTip ? (
        <div className="tooltip">
          👀
          <span className="tooltiptext">{flowerTip}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

type TaskSimple = { label: string; tooltipHint?: string | null };
type TaskRowProps = {
  tasksSimple: TaskSimple[];
  isCurrentStep: boolean;
};

function TaskRow({ tasksSimple, isCurrentStep }: TaskRowProps) {
  return (
    <>
      <div className={"step " + (isCurrentStep ? "selected" : "")}>
        {tasksSimple.map((tSimple) => {
          if (tSimple.tooltipHint) {
            return (
              <TaskCell
                label={tSimple.label}
                flowerTip={tSimple.tooltipHint}
                isCurrentStep={isCurrentStep}
              ></TaskCell>
            );
          } else {
            return (
              <TaskCell
                label={tSimple.label}
                isCurrentStep={isCurrentStep}
              ></TaskCell>
            );
          }
        })}
      </div>
    </>
  );
}

type StageProps = {
  stageNum: number;
  currStageStep: string;
  showExpeditionTasks: boolean;
  showFlowerTasks: boolean;
  showMushroomTasks: boolean;
  showPikminTasks: boolean;
  showWalkTasks: boolean;
};

export default function Stage({
  stageNum,
  currStageStep,
  showExpeditionTasks,
  showFlowerTasks,
  showMushroomTasks,
  showPikminTasks,
  showWalkTasks,
}: StageProps) {
  /* stages have 4 steps with n number of goals per step */

  let initialStep = (stageNum - 1) * 4;
  let finalStep = initialStep + 3;
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
          {/* map across all 4 steps within a stage */}
          {subsetTasks.map((goalsInStep, idx) => {
            let goals: TaskSimple[] = [];
            // map across tasks within a given step
            for (const goal of goalsInStep) {
              console.log(goal.label);
              const goalLabel: string = goal.label;

              // Hiding tasks based on filters chosen in header
              if (!showExpeditionTasks && goal.action === "Complete") {
                goals.push({
                  label: "-",
                });
                continue;
              }

              if (!showFlowerTasks && goal.action === "Plant") {
                goals.push({
                  label: "-",
                });
                continue;
              }

              if (!showMushroomTasks && goal.action === "Destroy") {
                goals.push({
                  label: "-",
                });
                continue;
              }

              if (!showPikminTasks && goal.action === "Grow") {
                goals.push({
                  label: "-",
                });
                continue;
              }

              if (!showWalkTasks && goal.action === "Walk") {
                goals.push({
                  label: "-",
                });
                continue;
              }

              // Render suggested color for plant "any" flowers
              if (
                goal.action === "Plant" &&
                goal.flower.color === "Any" &&
                goal.flower.species !== "Any"
              ) {
                goals.push({
                  label: goalLabel,
                  tooltipHint: anyFlowerTasks[goal.flower.species],
                });
              } else {
                goals.push({ label: goalLabel, tooltipHint: null });
              }
            }

            let isCurrentStep =
              currStage === String(stageNum) && currStep === String(idx + 1);
            return (
              <TaskRow
                isCurrentStep={isCurrentStep}
                tasksSimple={goals}
              ></TaskRow>
            );
          })}
        </div>
      </div>
    </>
  );
}
