import { mayTasks } from "./challenge_archive.tsx";

// TODO: monthly
const currTasks = mayTasks;

export type FlowerColor = "Blue" | "Red" | "Yellow" | "White" | "Any";

// flower species must be plural
// TODO: monthly
const SpeciesList = [
  "Calla Lilies",
  "Peonies",
  "Carnations",
  "Hydrangeas",
  "Frangipanis",
  "Water Lilies",
  "Morning Glories",
  "Hibiscuses",
  "Bougainvilleas",
  "Dianthuses",
  "Lilies of the Valley",
  "Anniversary Roses",
  "Any",
];
export type FlowerSpecies = (typeof SpeciesList)[number];
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
      let species: FlowerSpecies;
      // this typing is a mess, might need to rework later :(
      if (color === "Any") {
        // if color isn't present in input, then the species is just inputFlower
        species = inputFlower as FlowerSpecies;
      } else {
        // color is present, therefore the species is inputFlower w/o first word
        species = inputFlower.split(" ").slice(1).join(" ") as FlowerSpecies;
      }

      if (!SpeciesList.includes(species)) {
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

export let allTasks: Task[][] = [];

for (let step = 0; step < currTasks.length; step++) {
  let stepTaskList: Task[] = [];
  for (let task = 0; task < currTasks[step].length; task++) {
    let taskToParse = currTasks[step][task];
    let parsed = transformStringToTask(taskToParse);
    if (parsed !== null) {
      stepTaskList.push(parsed);
    }
  }
  allTasks.push(stepTaskList);
}

// todo: analyze the input to make this more helpful.
// thoughts:
//   should the recommended flower be:
//     if unused color, use that. else: use furthest out color?
//         furthest out = account for days? (mush total / 3)
// TODO: monthly
export let anyFlowerTasks = {
  Peonies: "Red",
  "Calla Lilies": "none :(",
  Carnations: "bloo",
  Hydrangeas: "uh",
  "Water Lilies": "none :(",
  Frangipanis: "none :(",
  "Morning Glories": "yello?",
  Hibiscuses: "none :(",
  Bougainvilleas: "??",
  Dianthuses: "??",
  "Lilies of the Valley": "??",
};

export let totalMushies = 0;
for (let taskList of allTasks) {
  for (let task of taskList) {
    if (task.action === "Destroy") {
      totalMushies += task.quantity;
    }
  }
}
export function convertStepToIndex(stepInput: string): number {
  let stage = parseInt(stepInput.split(".")[0]) - 1;
  let step = parseInt(stepInput.split(".")[1]) - 1;
  return stage * 4 + step;
}
export function getMushiesRemainingFromStep(
  step: string,
  total: number = totalMushies,
  allTasksIn: Task[][] = allTasks
): number {
  let end = convertStepToIndex(step) + 1;
  let mushiesSoFar = 0;
  for (let taskList of allTasksIn.slice(0, end)) {
    for (let task of taskList) {
      if (task.action === "Destroy") {
        mushiesSoFar += task.quantity;
      }
    }
  }

  return total - mushiesSoFar;
}
