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
  /* 4 stages, 4 steps per stage, 1-3 tasks per step */

  let initialStep = (stageNum - 1) * 4;
  let finalStep = initialStep + 3;
  //
  let subsetTasks: Task[][] = [];
  for (let step = initialStep; step <= finalStep; step++) {
    let taskList: Task[] = [];
    for (let taskIndex = 0; taskIndex < allTasks[step].length; taskIndex++) {
      taskList.push(allTasks[step][taskIndex]);
    }
    subsetTasks.push(taskList);
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
          {subsetTasks.map((tasksInStep, idx) => {
            let tasks: TaskSimple[] = [];
            // map across tasks within a given step
            for (const task of tasksInStep) {
              console.log(task.label);
              const taskLabel: string = task.label;

              // Hiding tasks based on filters chosen in header
              if (!showExpeditionTasks && task.action === "Complete") {
                tasks.push({
                  label: "-",
                });
                continue;
              }

              if (!showFlowerTasks && task.action === "Plant") {
                tasks.push({
                  label: "-",
                });
                continue;
              }

              if (!showMushroomTasks && task.action === "Destroy") {
                tasks.push({
                  label: "-",
                });
                continue;
              }

              if (!showPikminTasks && task.action === "Grow") {
                tasks.push({
                  label: "-",
                });
                continue;
              }

              if (!showWalkTasks && task.action === "Walk") {
                tasks.push({
                  label: "-",
                });
                continue;
              }

              // Render suggested color for plant "any" flowers
              if (
                task.action === "Plant" &&
                task.flower.color === "Any" &&
                task.flower.species !== "Any"
              ) {
                tasks.push({
                  label: taskLabel,
                  tooltipHint: anyFlowerTasks[task.flower.species],
                });
              } else {
                tasks.push({ label: taskLabel, tooltipHint: null });
              }
            }

            let isCurrentStep =
              currStage === String(stageNum) && currStep === String(idx + 1);
            return (
              <TaskRow
                isCurrentStep={isCurrentStep}
                tasksSimple={tasks}
              ></TaskRow>
            );
          })}
        </div>
      </div>
    </>
  );
}
