// TODO: monthly
import { currTasks } from "./2026_challenge_list";

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
  "Birds of Paradise",
  "Orchid Cactuses",
  "Any",
];

// TODO: split flower species into primary (new this month) and secondary (existing/already introduced?)
export type FlowerSpecies = (typeof SpeciesList)[number];
export type ActionType = "Walk" | "Grow" | "Complete" | "Plant" | "Destroy";

type BasicTask = {
  mushiesDefeatedSoFar: number;
  label: string;
  quantity: number;
  action: "Walk" | "Grow" | "Complete" | "Destroy";
};

type FlowerTask = {
  mushiesDefeatedSoFar: number;
  label: string;
  quantity: number;
  action: "Plant";
  flower: { color: FlowerColor; species: FlowerSpecies };
};

export type Task = BasicTask | FlowerTask;

export function transformStringToTaskAndCountTotalMushies(
  input: string,
): Task | null {
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
      mushiesDefeatedSoFar: totalMushies,
    };
  } else {
    if (action === "Destroy") {
      totalMushies += quantity;
    }

    return {
      label: input,
      action: action,
      quantity: quantity,
      mushiesDefeatedSoFar: totalMushies,
    };
  }
}

export let allTasks: Task[][] = [];
export let totalMushies = 0;
for (let step = 0; step < currTasks.length; step++) {
  let stepTaskList: Task[] = [];
  for (let task = 0; task < currTasks[step].length; task++) {
    let taskToParse = currTasks[step][task];
    let parsed = transformStringToTaskAndCountTotalMushies(taskToParse);
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

export function convertStepToIndex(stepInput: string): number {
  let stage = parseInt(stepInput.split(".")[0]) - 1;
  let step = parseInt(stepInput.split(".")[1]) - 1;
  return stage * 4 + step;
}

// Returns the number of mushies that have been defeated so far *prior* to the current step
// i.e. for Step 1.4, it assumes 0 mushies have been defeated
export function getMushiesDefeatedSoFar(
  step: string,
  allTasksIn: Task[][] = allTasks,
): number {
  let idx = convertStepToIndex(step);
  return allTasksIn[idx][0].mushiesDefeatedSoFar;
}
