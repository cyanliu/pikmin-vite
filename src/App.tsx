import React from "react";
import "./App.scss";
import Stage from "./components/Stage";

var bigOlThing = [
  ["Walk 1000 steps"],
  ["Grow 2 Pikmin"],
  ["Complete 2 Expeditions"],
  ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  ["Walk 2000 Steps"],
  ["Plant 1500 Flowers", "Destroy 2 mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 700 Peony", "Destroy 4 Mushrooms"],
  ["Complete 3 Expeditions"],
  ["Plant 1000 Red Calla Lily", "Destroy 3 Mushrooms"],
  ["Plant 1500 Yellow Calla Lily", "Destroy 4 Mushrooms"],
  ["Plant 2000 White Calla Lily", "Plant 1500 Peony", "Destroy 5 Mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 2000 White Peony", "Walk 3000 Steps", "Destroy 3 Mushrooms"],
  [
    "Plant 2000 Yellow Peony",
    "Plant 1000 Blue Calla Lily",
    "Destroy 4 Mushrooms",
  ],
  ["Plant 2000 Blue Peony", "Plant 2000 Calla Lily", "Destroy 5 Mushrooms"],
];
export type MyObject = { [key: string]: string[] };
var bigOlObj: MyObject = {};
var stageIncrement = 1;
var miniStep = 1;
for (let i = 1; i <= bigOlThing.length; i++) {
  let newKey = stageIncrement + "." + miniStep;
  bigOlObj[newKey] = bigOlThing[i - 1];

  miniStep += 1;
  if (i % 4 === 0) {
    stageIncrement += 1;
    miniStep = 1;
  }
}

console.log(bigOlObj);

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pikmin Monthly Challenge</h1>
        </header>
      </div>
      <div className="body">
        <div className="stage-container">
          <Stage stageNum={1} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={2} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={3} stageGoals={bigOlObj}></Stage>
          <Stage stageNum={4} stageGoals={bigOlObj}></Stage>
        </div>
      </div>
    </>
  );
}

export default App;
