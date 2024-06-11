export type FlowerColor = "Blue" | "Red" | "Yellow" | "White" | "Any";
export type FlowerSpecies = "Carnation" | "Hydrangea" | "Any";

export type TaskType = "Walk" | "Grow" | "Complete" | "Plant" | "Destroy";

type BasicTask = {
  label: string;
  action: "Walk" | "Grow" | "Complete" | "Destroy";
};

type FlowerTask = {
  label: string;
  action: "Plant";
  flower: { color: FlowerColor; species: FlowerSpecies };
};

type Task = BasicTask | FlowerTask;

let tasks: Task[] = [
  { label: "Walk 1000 steps", action: "Walk" },
  { label: "Grow 2 Pikmin", action: "Grow" },
  { label: "Complete 2 Expeditions", action: "Complete" },
  {
    label: "Plant 1000 Flowers",
    action: "Plant",
    flower: { color: "Any", species: "Any" },
  },
  { label: "Destroy 2 Mushrooms", action: "Destroy" },
];

// while iterating through tasksList, I (think I) want each element
// to be tied to a type? ...

function getStylingClass(task: Task): string {
  const action = task.action;
  switch (action) {
    case "Walk":
      return "steps";
    case "Grow":
      return "pikmin";
    case "Complete":
      return "expedition";
    case "Plant":
      return "flower";
    case "Destroy":
      return "mushroom";
  }
}

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
export default bigOlObj;

// formatted array of arrays?

for (let s = 0; s < bigOlThing.length; s++) {
  for (let g = 0; g < bigOlThing[s].length; g++) {
    let goalType = "";
    goalType = bigOlThing[s][g].split(" ")[0];
  }
}
