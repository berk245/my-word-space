function getExerciseWords(user, exerciseParameters) {
  if (hasEmptyParameterFields(exerciseParameters)) return handleError('fields')
  if (notEnoughWordsAvailable(exerciseParameters, user)) return handleError('words');

  let wordPool = getWordPool(user, exerciseParameters);
  let uniqueIndexes = getIndexes(wordPool, exerciseParameters.amount);

  return createExerciseWords(wordPool, uniqueIndexes);
}

const createExerciseWords = (wordPool, indexes) => {
  let result = [];
  for (let i = 0; i < indexes.length; i++) {
    result.push(wordPool[indexes[i]]);
  }
  return result;
};

function randomNumberGenerator(range) {
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

const getWordPool = (user, exerciseParams) => {
  let creator = new WordpoolCreator(user, exerciseParams);
  let { notebook } = exerciseParams;

  if (notebook == "all") return creator.allNotebooks();
  else return creator.specificNotebook();
};
const getIndexes = (wordPool, requestedWordAmount) => {
  let indexSet = new Set([]);
  let range = wordPool.length;

  while (requestedWordAmount > indexSet.size) {
    indexSet.add(randomNumberGenerator(range - 1));
  }

  return Array.from(indexSet.values());
};
const handleError = (errorType) => {
  return ({
    error: true,
    errorMessage: errorType == 'fields' ? 'Please fill all fields' : 'Not enough words'
  })
}
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
    else result = this.allNotebooksSpecificType();

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

class WordpoolCreator {
  constructor(user, exerciseParams) {
    this.user = user;
    this.amount = exerciseParams.amount;
    this.notebook = exerciseParams.notebook;
    this.type = exerciseParams.type;
  }

  allNotebooks() {
    let result = [];
    //Create an array with notebook keys to iterate on object with notebooks[keys[i]]
    let notebookNames = Object.keys(this.user.notebooks);

    //Words are random
    if (this.type == "random") {
      for (let i = 0; i < notebookNames.length; i++) {
        let words = this.user.notebooks[notebookNames[i]].words;
        Object.values(words).map(words => {
          result.push(...words);
        });
      }
    }
    //Specific Word Type Selected
    else {
      for (let i = 0; i < notebookNames.length; i++) {
        result.push(...this.user.notebooks[notebookNames[i]].words[this.type]);
      }
    }
    return result;
  }
  specificNotebook() {
    let result = [];
    //random Words
    let userNotebook = this.user.notebooks[this.notebook].words;
    if (this.type == "random") {
      Object.values(userNotebook).map(words => {
        result.push(...words);
      });
    }
    //Specific Word Type Selected
    else {
      result.push(...userNotebook[this.type]);
    }
    return result;
  }
}
export default getExerciseWords;
// module.exports = getExerciseWords;
