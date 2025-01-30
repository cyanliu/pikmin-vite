import {
  Task,
  transformStringToTask,
  convertStepToIndex,
  getMushiesRemainingFromStep,
} from "./challenge_helper";

test("transforms raw strings into tasks", () => {
  const testInputs = [
    "Walk 1000 Steps",
    "Plant 1000 Blue Carnations",
    "Plant 4321 Flowers",
    "Plant 1234 Carnations",
    "some invalid task",
    "Plant 300 FakeSpecies",
    "Plant 400 Blue FakeSpecies",
  ];

  const expected = [
    { label: "Walk 1000 Steps", action: "Walk", quantity: 1000 },
    {
      label: "Plant 1000 Blue Carnations",
      action: "Plant",
      quantity: 1000,
      flower: { color: "Blue", species: "Carnations" },
    },
    {
      label: "Plant 4321 Flowers",
      action: "Plant",
      quantity: 4321,
      flower: { color: "Any", species: "Any" },
    },
    {
      label: "Plant 1234 Carnations",
      action: "Plant",
      quantity: 1234,
      flower: { color: "Any", species: "Carnations" },
    },
  ];

  let actual: Task[];
  actual = [];
  for (let input of testInputs) {
    let result = transformStringToTask(input);
    if (result) {
      actual.push(result);
    }
  }

  expect(actual).toEqual(expected);
});

test("converts stage.step notation to a 0-based index", () => {
  let actual = convertStepToIndex("1.4");
  expect(actual).toEqual(3);
});

test("calculates mushies remaining", () => {
  // total = 38
  // 1.4 = "Destroy 2 Mushrooms"
  let actual = getMushiesRemainingFromStep("1.4");
  expect(actual).toEqual(36);
});
