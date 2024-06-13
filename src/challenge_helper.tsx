export type FlowerColor = "Blue" | "Red" | "Yellow" | "White" | "Any";
// flower species must be plural
export type FlowerSpecies =
  | "Calla Lilies"
  | "Peonies"
  | "Carnations"
  | "Hydrangeas"
  | "Any";
export type ActionType = "Walk" | "Grow" | "Complete" | "Plant" | "Destroy";

type BasicTask = {
  label: string;
  quantity: number;
  action: "Walk" | "Grow" | "Complete" | "Destroy";
};

type FlowerTask = {
  label: string;
  quantity: number;
  action: "Plant";
  flower: { color: FlowerColor; species: FlowerSpecies };
};

export type Task = BasicTask | FlowerTask;

// let tasks: Task[] = [
//   { label: "Walk 1000 steps", action: "Walk", quantity: 1000 },
//   { label: "Grow 2 Pikmin", action: "Grow", quantity: 2 },
//   { label: "Complete 2 Expeditions", action: "Complete", quantity: 2 },
//   {
//     label: "Plant 1000 Flowers",
//     action: "Plant",
//     flower: { color: "Any", species: "Any" },
//     quantity: 1000,
//   },
//   { label: "Destroy 2 Mushrooms", action: "Destroy", quantity: 2 },
// ];

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

export function transformStringToTask(input: string): Task | null {
  let action = input.split(" ")[0];

  if (
    action !== "Walk" &&
    action !== "Grow" &&
    action !== "Complete" &&
    action !== "Destroy" &&
    action !== "Plant"
  ) {
    return null;
  }

  let quantity = parseInt(input.split(" ")[1]);
  // some shitty code but quantity will never be 0 i hope
  if (!quantity) {
    return null;
  }

  if (action === "Plant") {
    let inputFlower = input.split(" ").slice(2).join(" ");

    let flowerStruct: { color: FlowerColor; species: FlowerSpecies };

    if (inputFlower === "Flowers") {
      // eg. "Plant 1000 Flowers"
      // there will never(??) be color !== any && species === any
      flowerStruct = { color: "Any", species: "Any" };
    } else {
      // parse out color and species

      // parsing color
      // get first word of inputFlower
      let inputColor = inputFlower.split(" ")[0];
      let color: FlowerColor;
      if (
        inputColor !== "Blue" &&
        inputColor !== "Red" &&
        inputColor !== "Yellow" &&
        inputColor !== "White"
      ) {
        // if the first word isn't a color, then it's any
        color = "Any";
      } else {
        // if the first word is a color, then it..is a color..
        color = inputColor;
      }

      // TODO: figure out how to make this more robust...
      let inputSpecies;
      let species: FlowerSpecies;
      // this typing is a mess, might need to rework later :(
      if (color === "Any") {
        // if color isn't present in input, then the species is just inputFlower
        species = inputFlower as FlowerSpecies;
      } else {
        // color is present, therefore the species is inputFlower w/o first word
        species = inputFlower.split(" ").slice(1).join(" ") as FlowerSpecies;
      }

      if (
        species !== "Calla Lilies" &&
        species !== "Peonies" &&
        species !== "Carnations" &&
        species !== "Hydrangeas" &&
        species !== "Any"
      ) {
        return null;
      }

      flowerStruct = { color: color, species: species };
    }

    return {
      label: input,
      action: action,
      quantity: quantity,
      flower: flowerStruct,
    };
  } else {
    return { label: input, action: action, quantity: quantity };
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
  ["Plant 700 Peonies", "Destroy 4 Mushrooms"],
  ["Complete 3 Expeditions"],
  ["Plant 1000 Red Calla Lilies", "Destroy 3 Mushrooms"],
  ["Plant 1500 Yellow Calla Lilies", "Destroy 4 Mushrooms"],
  [
    "Plant 2000 White Calla Lilies",
    "Plant 1500 Peonies",
    "Destroy 5 Mushrooms",
  ],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 2000 White Peonies", "Walk 3000 Steps", "Destroy 3 Mushrooms"],
  [
    "Plant 2000 Yellow Peonies",
    "Plant 1000 Blue Calla Lilies",
    "Destroy 4 Mushrooms",
  ],
  ["Plant 2000 Blue Peonies", "Plant 2000 Calla Lilies", "Destroy 5 Mushrooms"],
];

export let allTasks: Task[][] = [];

for (let step = 0; step < bigOlThing.length; step++) {
  let stepTaskList: Task[] = [];
  for (let task = 0; task < bigOlThing[step].length; task++) {
    let taskToParse = bigOlThing[step][task];
    let parsed = transformStringToTask(taskToParse);
    if (parsed !== null) {
      stepTaskList.push(parsed);
    }
  }
  allTasks.push(stepTaskList);
}
