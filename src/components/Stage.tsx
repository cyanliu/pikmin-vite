import { ActionType, allTasks } from "../challenge_helper";

type TaskCellProps = {
  label: string;
  action: ActionType;
  isCurrentStep: boolean;
};

function TaskCell({ label, action, isCurrentStep }: TaskCellProps) {
  return (
    <div className={"goal " + (isCurrentStep ? "selected" : "")}>
      <span className={action}>{label}</span>
    </div>
  );
}

type TaskSimple = { label: string; action: ActionType };
type TaskRowProps = {
  tasksSimple: TaskSimple[];
  isCurrentStep: boolean;
};

function TaskRow({ tasksSimple, isCurrentStep }: TaskRowProps) {
  return (
    <>
      <div className={"step " + (isCurrentStep ? "selected" : "")}>
        {tasksSimple.map((tSimple, idx) => {
          return (
            <TaskCell
              label={tSimple.label}
              action={tSimple.action}
              isCurrentStep={isCurrentStep}
              key={idx}
            ></TaskCell>
          );
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

  // these components are reused for each of the 4 stages,
  // there are these initialStep & finalStep bookends for allTasks
  let initialStep = (stageNum - 1) * 4;
  let finalStep = initialStep + 3;

  // subsetTasks = the chunk of allTasks that corresponds to this stage
  let subsetTasks = allTasks.slice(initialStep, finalStep + 1);

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
              const taskLabel: string = task.label;

              // Hiding tasks based on filters chosen in header
              if (!showExpeditionTasks && task.action === "Complete") {
                tasks.push({
                  label: "-",
                  action: task.action,
                });
                continue;
              }

              if (!showFlowerTasks && task.action === "Plant") {
                tasks.push({
                  label: "-",
                  action: task.action,
                });
                continue;
              }

              if (!showMushroomTasks && task.action === "Destroy") {
                tasks.push({
                  label: "-",
                  action: task.action,
                });
                continue;
              }

              if (!showPikminTasks && task.action === "Grow") {
                tasks.push({
                  label: "-",
                  action: task.action,
                });
                continue;
              }

              if (!showWalkTasks && task.action === "Walk") {
                tasks.push({
                  label: "-",
                  action: task.action,
                });
                continue;
              }
              tasks.push({ label: taskLabel, action: task.action });
            }

            let isCurrentStep =
              currStage === String(stageNum) && currStep === String(idx + 1);
            return (
              <TaskRow
                isCurrentStep={isCurrentStep}
                tasksSimple={tasks}
                key={idx}
              ></TaskRow>
            );
          })}
        </div>
      </div>
    </>
  );
}
