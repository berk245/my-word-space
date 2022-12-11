// export default (user, exerciseParameters) => {
module.exports = (user, exerciseParameters) => {
  if (requestHasEmptyParameterFields(exerciseParameters))
    return createErrorResponse("fields");
  if (!userHasEnoughWords(user, exerciseParameters))
    return createErrorResponse("words");
  
  let wordPool = getWordpool(user, exerciseParameters);
  let uniqueIndexes = getIndexes(wordPool, exerciseParameters.amount);

  let result = [];
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
    return this.notebook == "all"
      ? this.allNotebooks()
      : this.specificNotebook();
  }

  allNotebooks() {
    let result = [];
    let userNotebooks = Object.values(this.user.notebooks);

    if (this.type == "random") {
      userNotebooks.map(userNotebook => {
        /*This part is confusing due to the poor database design and bad table names.
        userNotebook.words should be userNotebook.types, followed by words in that type
        */
        Object.values(userNotebook.words).map(typeWords => {
          result.push(...typeWords);
        });
      });
    } else {
      userNotebooks.map(userNotebook => {
        result.push(...userNotebook.words[this.type]);
      });
    }
    return result;
  }
  specificNotebook() {
    let result = [];
    let userNotebook = this.user.notebooks[this.notebook].words;
    if (this.type == "random") {
      Object.values(userNotebook).map(words => {
        result.push(...words);
      });
    } else {
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
