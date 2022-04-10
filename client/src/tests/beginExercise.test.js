// import createWordPool from "../functions/beginExercise";
const mockDB = require("./mockDB");
const beginExercise = require("../functions/beginExercise");

let errorTestParams = {
  invalidParameter: {
    amount: "",
    notebook: "",
    type: ""
  },

  specificNotebookAndType: {
    amount: 400,
    notebook: "Notebook100",
    type: "type1"
  },

  specificNotebookAllTypes: {
    amount: 400,
    notebook: "Notebook100",
    type: "random"
  },

  allNotebooksSpecificType: {
    amount: 600,
    notebook: "all",
    type: "type1"
  },
  allNotebooksAllTypes: {
    amount: 11100,
    notebook: "all",
    type: "random"
  }
};

let wordPool = {
    allRandom: {
        amount: 10,
        notebook: "all",
        type: "random"
      },
    allNotebooksSpecificType: {
        amount: 10,
        notebook: "all",
        type: "type1"
      },
    specificNotebookAndType: {
        amount: 10,
        notebook: "Notebook100",
        type: "type1"
      },
      specificNotebookAllTypes: {
        amount: 10,
        notebook: "Notebook100",
        type: "random"
      },
}


test("should return false when an invalid object is passed as parameter.", () => {
  expect(beginExercise(mockDB, errorTestParams.invalidParameter).error).toBe(true);
});

test("should return false when a specific notebook has less total words then requested amount.", () => {
  expect(beginExercise( mockDB ,errorTestParams.specificNotebookAndType).error).toBe(
    true
  );
});

test("should return false when a specific notebook has less words of a specific type then requested amount.", () => {
  expect(beginExercise( mockDB, errorTestParams.specificNotebookAllTypes,).error).toBe(
    true
  );
});

test("should return false when a user has less total words of a specific type then requested amount.", () => {
  expect(beginExercise(mockDB, errorTestParams.allNotebooksSpecificType).error).toBe(
    true
  );
});
test("should return false when a user has less total words then requested amount.", () => {
  expect(beginExercise( mockDB, errorTestParams.allNotebooksAllTypes).error).toBe(
    true
  );
});

test("should return a array of unique words with the right size when all books and types are chosen.", () => {
    let result = beginExercise( mockDB, wordPool.allRandom)
    let arrayToSet = new Set(result)

    expect(result).toHaveLength(10)
    expect(arrayToSet.size).toBe(10)
});
test("should return a array of unique words with the right size when all notebooks and a specific type is chosen.", () => {
    let result = beginExercise( mockDB, wordPool.allNotebooksSpecificType)
    let arrayToSet = new Set(result)

    expect(result).toHaveLength(10)
    expect(arrayToSet.size).toBe(10)
});
test("should return a array of unique words with the right size when a notebook choosen with all types.", () => {
    let result = beginExercise( mockDB, wordPool.specificNotebookAllTypes)
    let arrayToSet = new Set(result)

    expect(result).toHaveLength(10)
    expect(arrayToSet.size).toBe(10)
});
test("should return a array of unique words with the right size when a specific notebook is chosen with a specific type.", () => {
    let result = beginExercise( mockDB, wordPool.specificNotebookAndType)
    let arrayToSet = new Set(result)

    expect(result).toHaveLength(10)
    expect(arrayToSet.size).toBe(10)
});


// test.only("should create wordpools with the right size.", () => {
//     expect(beginExercise(wordPool.allRandom, mockDB)).toHaveLength(2000)
// });

