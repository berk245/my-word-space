// export default (user, exerciseParameters) => {
module.exports = (user, exerciseParameters) => {
  if (requestHasEmptyParameterFields(exerciseParameters))
    return createErrorResponse("fields");
  if (!userHasEnoughWords(user, exerciseParameters))
    return createErrorResponse("words");
  let result = [];

  //create a pool of words to randomly choose from
  let wordPool = getWordpool(user, exerciseParameters);
  let uniqueIndexes = getIndexes(wordPool, exerciseParameters.amount);

  //Iterate through each index, get that indexed element from filteredArray, assign it to questions array
  uniqueIndexes.map(uniqueIndex => {
    result.push(wordPool[uniqueIndex]);
  });
  return result;
};
const requestHasEmptyParameterFields = exerciseParameters => {
  for (var key in exerciseParameters) {
    if (!exerciseParameters[key]) return true;
  }
  return false;
};
const createErrorResponse = errorType => {
  return {
    error: true,
    message:
      errorType == "fields" ? "Please fill all fields" : "Not enough words"
  };
};
const userHasEnoughWords = (user, exerciseParameters) => {
  let wordAmountValidator = new WordAmountCounter(user, exerciseParameters);
  return wordAmountValidator.userHasEnoughWords();
};
class WordAmountCounter {
  constructor(user, exerciseParams) {
    this.user = user;
    this.amount = exerciseParams.amount;
    this.notebook = exerciseParams.notebook;
    this.type = exerciseParams.type;
  }
  userHasEnoughWords() {
    return this.notebook == 'all' ?  this.allNotebooks() :  this.specificNotebook()
  }
  specificNotebook() {
    let result = true;
    if (this.type == "random") result = this.specificNotebookAllTypes();
    else result = this.specificNotebookSpecificType();
    return result;
  }
  allNotebooks() {
    let result = true;
    if (this.type == "random") result = this.allNotebooksAllTypes();
    else result = this.allNotebooksSpecificType();

    return result;
  }
  specificNotebookAllTypes() {
    if (this.amount >= this.user.notebooks[this.notebook].wordCount) {
      return false;
    }
    return true;
  }
  specificNotebookSpecificType() {
    if (
      this.amount >= this.user.notebooks[this.notebook].words[this.type].length
    ) {
      return false;
    }
    return true;
  }
  allNotebooksAllTypes() {
    if (this.amount >= this.user.totalWordCount) {
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
      return false;
    }
    return true;
  }
}
const getWordpool = (user, exerciseParameters) => {
  let wordpoolCreator = new WordpoolCreator(user, exerciseParameters);
  return wordpoolCreator.create();
};
class WordpoolCreator {
  constructor(user, exerciseParams) {
    this.user = user;
    this.amount = exerciseParams.amount;
    this.notebook = exerciseParams.notebook;
    this.type = exerciseParams.type;
  }

  create() {
    if (this.notebook == "all") return this.allNotebooks();
    else return this.specificNotebook();
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
const getIndexes = (wordPool, requestedWordAmount) => {
  let indexSet = new Set([]);
  let range = wordPool.length;

  while (requestedWordAmount > indexSet.size) {
    indexSet.add(randomNumberGenerator(range - 1));
  }

  return Array.from(indexSet.values());
};
const randomNumberGenerator = range => {
  let randomNumber = Math.floor(Math.random() * Math.floor(range));
  return randomNumber;
};
