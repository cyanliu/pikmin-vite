const enum FlowerColor {
  Blue = "Blue",
  Red = "Red",
  Yellow = "Yellow",
  White = "White",
  Any = "Any", // ????
}

const enum FlowerType {
  Calla = "Calla",
  Peony = "Peon",
  Any = "Any",
}

// first word of goal
const enum GoalType {
  Walk = "Walk",
  Plant = "Plant",
  Expeditions = "Complete",
  Mushrooms = "Destroy",
  Grow = "Grow",
}

// if walk | plant | expeditions | mushrooms | grow, set count
// if plant | set flowerType & flowerColor
// array of arrays?

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
