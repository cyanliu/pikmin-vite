export type FlowerColor = "Blue" | "Red" | "Yellow" | "White" | "Any";
// flower species must be plural
// TODO: monthly
export type FlowerSpecies =
  | "Calla Lilies"
  | "Peonies"
  | "Carnations"
  | "Hydrangeas"
  | "Frangipanis"
  | "Water Lilies"
  | "Morning Glories"
  | "Hibiscuses"
  | "Bougainvilleas"
  | "Dianthuses"
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

      // TODO: monthly
      if (
        species !== "Calla Lilies" &&
        species !== "Peonies" &&
        species !== "Carnations" &&
        species !== "Hydrangeas" &&
        species !== "Frangipanis" &&
        species !== "Water Lilies" &&
        species !== "Morning Glories" &&
        species !== "Hibiscuses" &&
        species !== "Bougainvilleas" &&
        species !== "Dianthuses" &&
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

var juneTasks = [
  ["Walk 1000 steps"],
  ["Grow 2 Pikmin"],
  ["Complete 2 Expeditions"],
  ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  ["Walk 2000 Steps"],
  ["Plant 1500 Flowers", "Destroy 2 mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  // ^ these first 7 were the same between june and july?
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

var julyTasks = [
  ["Walk 1000 steps"],
  ["Grow 2 Pikmin"],
  ["Complete 2 Expeditions"],
  ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  ["Walk 2000 Steps"],
  ["Plant 1500 Flowers", "Destroy 2 mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  // ^ these first 7 were the same between june and july?
  ["Plant 700 Water Lilies", "Destroy 4 Mushrooms"],
  ["Complete 3 Expeditions"],
  ["Plant 1500 Red Frangipanis", "Destroy 3 Mushrooms"],
  ["Plant 1500 Yellow Frangipanis", "Destroy 4 Mushrooms"],
  [
    "Plant 2000 White Frangipanis",
    "Plant 1500 Water Lilies",
    "Destroy 5 Mushrooms",
  ],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 2000 White Water Lilies", "Walk 3000 Steps", "Destroy 3 Mushrooms"],
  [
    "Plant 2000 Red Water Lilies",
    "Plant 1000 Yellow Water Lilies",
    "Destroy 4 Mushrooms",
  ],
  [
    "Plant 1000 Blue Water Lilies",
    "Plant 2500 Frangipanis",
    "Destroy 5 Mushrooms",
  ],
];

var augustTasks = [
  ["Walk 1000 steps"],
  ["Grow 2 Pikmin"],
  ["Complete 2 Expeditions"],
  ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  ["Walk 2000 Steps"],
  ["Plant 1500 Flowers", "Destroy 2 mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  // ^ these first 7 were the same between june and july and aug?
  ["Plant 700 Morning Glories", "Destroy 4 Mushrooms"],
  ["Complete 3 Expeditions"],
  ["Plant 1500 Red Hibiscuses", "Destroy 3 Mushrooms"],
  ["Plant 2000 Yellow Hibiscuses", "Destroy 4 Mushrooms"],
  [
    "Plant 2000 White Hibiscuses",
    "Plant 1500 Morning Glories",
    "Destroy 5 Mushrooms",
  ],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 1800 Red Morning Glories", "Destroy 3 Mushrooms"],
  [
    "Plant 1500 White Morning Glories",
    "Plant 2000 Blue Morning Glories",
    "Destroy 4 Mushrooms",
  ],
  [
    "Plant 1500 Yellow Morning Glories",
    "Plant 2000 Hibiscuses",
    "Destroy 5 Mushrooms",
  ],
];

var septTasks = [
  ["Walk 1000 steps"],
  ["Grow 2 Pikmin"],
  ["Complete 2 Expeditions"],
  ["Plant 1000 Flowers", "Destroy 2 mushrooms"],
  ["Walk 2000 Steps"],
  ["Plant 1500 Flowers", "Destroy 2 mushrooms"],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  // ^ these first 7 were the same between june and july and aug?
  ["Plant 700 Bougainvilleas", "Destroy 4 Mushrooms"],
  ["Complete 3 Expeditions"],
  ["Plant 2000 Red Dianthuses", "Destroy 3 Mushrooms"],
  ["Plant 1000 Blue Dianthuses", "Destroy 4 Mushrooms"],
  [
    "Plant 1500 White Dianthuses",
    "Plant 1500 Bougainvilleas",
    "Destroy 5 Mushrooms",
  ],
  ["Grow 3 Pikmin", "Destroy 3 Mushrooms"],
  ["Plant 2000 White Bougainvilleas", "Destroy 3 Mushrooms"],
  [
    "Plant 1500 Yellow Bougainvilleas",
    "Plant 2000 Red Bougainvilleas",
    "Destroy 4 Mushrooms",
  ],
  [
    "Plant 1500 Blue Bougainvilleas",
    "Plant 2000 Dianthuses",
    "Destroy 5 Mushrooms",
  ],
];

export let allTasks: Task[][] = [];

// TODO: monthly
const currTasks = septTasks;

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
};
