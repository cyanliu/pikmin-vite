import React, { ReactNode, useState } from "react";

type StepPickerProps = {
  setcurrStageStep: React.Dispatch<React.SetStateAction<string>>;
};

export default function StepPicker({ setcurrStageStep }: StepPickerProps) {
  return (
    <>
      <div className="inputs">
        <select
          id="current-step"
          onChange={(event) => {
            let stepGoal = event.currentTarget.value;
            setcurrStageStep(stepGoal);
          }}
        >
          <option value={"1.1"}>1.1</option>
          <option value={"1.2"}>1.2</option>
          <option value={"1.3"}>1.3</option>
          <option value={"1.4"}>1.4</option>
          <option value={"2.1"}>2.1</option>
          <option value={"2.2"}>2.2</option>
          <option value={"2.3"}>2.3</option>
          <option value={"2.4"}>2.4</option>
          <option value={"3.1"}>3.1</option>
          <option value={"3.2"}>3.2</option>
          <option value={"3.3"}>3.3</option>
          <option value={"3.4"}>3.4</option>
          <option value={"4.1"}>4.1</option>
          <option value={"4.2"}>4.2</option>
          <option value={"4.3"}>4.3</option>
          <option value={"4.4"}>4.4</option>
        </select>
      </div>
    </>
  );
}
