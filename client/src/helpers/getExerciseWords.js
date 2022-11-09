// export default (user, exerciseParameters) => {
module.exports = (user, exerciseParameters) => {
  if (hasEmptyParameterFields(exerciseParameters)) return createErrorResponse('fields');
  if(!userHasEnoughWords(user, exerciseParameters)) return createErrorResponse('words')
  let result = [];


  //create a pool of words to randomly choose from
  let wordPool = getWordpool(user, exerciseParameters);

  //Wordpool is Succesfully Created, check if the chosen amount equals the total number of words in DB

  //Define a set to put random indexes in
  let indexSet = new Set([]);
  //Until the exercise amount is reached, fill it with random indexes ranged till filtered array length
  let range = wordPool.length;
  while (exerciseParameters.amount > indexSet.size) {
    let randomInt = randomNumberGenerator(range - 1);
    indexSet.add(randomInt);
  }
  //Turn the set into an array
  let indexes = Array.from(indexSet.values());
  //Iterate through each index, get that indexed element from filteredArray, assign it to questions array
  for (let i = 0; i < indexes.length; i++) {
    result.push(wordPool[indexes[i]]);
  }
  return result;
};

const randomNumberGenerator = range => {
  let randomNumber = Math.floor(Math.random() * Math.floor(range));
  return randomNumber;
};

const hasEmptyParameterFields = exerciseParameters => {
  for (var key in exerciseParameters) {
    if (!exerciseParameters[key]) return true;
  }
  return false;
};

const userHasEnoughWords = (user, exerciseParameters) => {
  let { notebook } = exerciseParameters;
  let wordAmountValidator = new WordAmountCounter(user, exerciseParameters)
  if (notebook === "all") return wordAmountValidator.allNotebooks()
  else return wordAmountValidator.specificNotebook() 
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
const createErrorResponse = (errorType) => {
    return ({
      error: true,
      message: errorType == 'fields' ? 'Please fill all fields' : 'Not enough words'
    })
  }
const getWordpool = (user, exerciseParameters) => {
  let result = []
  let chosenType = exerciseParameters.type;
  let chosenNotebook = exerciseParameters.notebook
   //Notebook is all
   if (chosenNotebook == "all") {
    //Create an array with notebook keys to iterate on object with notebooks[keys[i]]
    let notebookNames = Object.keys(user.notebooks);

    //Words are random
    if (chosenType == "random") {
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
        result.push(...user.notebooks[notebookNames[i]].words[chosenType]);
      }
    }
  }
  //Specific Notebook
  else {
    let userNotebook = user.notebooks[chosenNotebook].words;
    //random Words
    if (chosenType == "random") {
        Object.values(userNotebook).map(words => {
          result.push(...words);
        });
    }
    //Specific Word Type Selected
    else {
      result.push(...userNotebook[chosenType]);
    }
  }
  return result;
}
