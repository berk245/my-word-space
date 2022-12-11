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
  let validator = new WordAmountValidator(user, exerciseParameters);
  return validator.validate();
};
class WordAmountValidator {
  constructor(user, { amount, notebook, type }) {
    this.user = user;
    this.amount = amount;
    this.notebook = notebook;
    this.type = type;
  }
  validate() {
    return this.notebook == "all"
      ? this.checkAllNotebooks()
      : this.checkSpecificNotebook();
  }
  checkSpecificNotebook() {
    return this.type == "random"
      ? this.specificNotebookAllTypes()
      : this.specificNotebookSpecificType();
  }
  checkAllNotebooks() {
    return this.type == "random"
      ? this.allNotebooksAllTypes()
      : this.allNotebooksSpecificType();
  }
  specificNotebookAllTypes() {
    return this.amount <= this.user.notebooks[this.notebook].wordCount;
  }
  specificNotebookSpecificType() {
    return (
      this.amount <= this.user.notebooks[this.notebook].words[this.type].length
    );
  }
  allNotebooksAllTypes() {
    return this.amount <= this.user.totalWordCount;
  }
  allNotebooksSpecificType() {
    let totalChosenType = 0;
    Object.values(this.user.notebooks).map(userNotebook => {
      totalChosenType += userNotebook.words[this.type].length;
    });
    return this.amount < totalChosenType;
  }
}
const getWordpool = (user, exerciseParameters) => {
  let wordpoolCreator = new WordpoolCreator(user, exerciseParameters);
  return wordpoolCreator.create();
};
class WordpoolCreator {
  constructor(user, { amount, notebook, type }) {
    this.user = user;
    this.amount = amount;
    this.notebook = notebook;
    this.type = type;
  }

  create() {
    return (this.notebook == "all") ? this.allNotebooks() : this.specificNotebook();
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
