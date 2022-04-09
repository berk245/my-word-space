function createWordPool(exerciseParameters, user) {
  if (hasEmptyParameterFields(exerciseParameters)) return false;
  if (notEnoughWordsAvailable(exerciseParameters, user)) return false;
  let chosenBook = exerciseParameters.notebook;
  let chosenType = exerciseParameters.type;
  let wordPool = [];

  //Notebook is all
  if (chosenBook == "all") {
    //Create an array with notebook keys to iterate on object with notebooks[keys[i]]
    let notebookNames = Object.keys(user.notebooks);

    //Words are random
    if (chosenType == "random") {
      for (let i = 0; i < notebookNames.length; i++) {
        let words = user.notebooks[notebookNames[i]].words;
        Object.values(words).map(words => {
          wordPool.push(...words);
        });
      }
    }
    //Specific Word Type Selected
    else {
      for (let i = 0; i < notebookNames.length; i++) {
        wordPool.push(...user.notebooks[notebookNames[i]].words[chosenType]);
      }
    }
  }
  //Specific Notebook
  else {
    //random Words
    let userNotebook = user.notebooks[chosenBook].words;
    if (chosenType == "random") {
      Object.values(userNotebook).map(words => {
        wordPool.push(...words);
      });
    }
    //Specific Word Type Selected
    else {
      wordPool.push(...userNotebook[chosenType]);
    }
  }
  let indexSet = new Set([]);
  //Until the exercise amount is reached, fill it with random indexes ranged till filtered array length
  let range = wordPool.length;
  while (exerciseParameters.amount > indexSet.size) {
    let randomInt = randomNumberGen(range - 1);
    indexSet.add(randomInt);
  }
  let result = [];
  //Turn the set into an array
  let indexes = Array.from(indexSet.values());
  //Iterate through each index, get that indexed element from filteredArray, assign it to questions array
  for (let i = 0; i < indexes.length; i++) {
    result.push(wordPool[indexes[i]]);
  }

  return result;
}

function randomNumberGen(range) {
  let randomNumber = Math.floor(Math.random() * Math.floor(range));
  return randomNumber;
}

const hasEmptyParameterFields = exerciseParameters => {
  for (var key in exerciseParameters) {
    if (!exerciseParameters[key]) return true;
  }
  return false;
};

const notEnoughWordsAvailable = (exerciseParameters, user) => {
  let { notebook, type, amount } = exerciseParameters;
  let result;
  let checker = new WordAmountCounter(user, exerciseParameters);
  if (notebook != "all") result = checker.specificNotebook();
  else result = checker.allNotebooks();
  return !result;
};

class WordAmountCounter {
  constructor(user, exerciseParams) {
    this.user = user;
    this.amount = exerciseParams.amount;
    this.notebook = exerciseParams.notebook;
    this.type = exerciseParams.type;
  }

  specificNotebook() {
    let result = true;
    if (this.type == "random") result = this.specificNotebookAllTypes();
    else result = this.specificNotebookSpecificType();
    return result;
  }
  specificNotebookAllTypes() {
    if (this.amount >= this.user.notebooks[this.notebook].wordCount) {
      console.log("You don't have enough words in selected notebok ");
      return false;
    }
    return true;
  }
  specificNotebookSpecificType() {
    if (
      this.amount >= this.user.notebooks[this.notebook].words[this.type].length
    ) {
      console.log("You don't have enough words in selected notebok ");
      return false;
    }
    return true;
  }

  allNotebooks() {
    let result = true;
    if (this.type == "random") result = this.allNotebooksAllTypes();
    else result = this.allNotebooksSpecificType()

    return result;
  }

  allNotebooksAllTypes() {
    if (this.amount >= this.user.totalWordCount) {
      console.log("You don't have enough words in selected notebok ");
      return false;
    }
    return true;
  }
  allNotebooksSpecificType() {
    let totalChosenType = 0;
    for (var key in this.user.notebooks) {
      totalChosenType += this.user.notebooks[key].words[this.type].length;
    }
    if (this.amount > totalChosenType) {
      console.log("You don't have enough words in selected notebok ");
      return false;
    }
    return true;
  }
}
module.exports = createWordPool;
