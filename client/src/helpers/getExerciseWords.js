// export default (user, exerciseParameters) => {
module.exports = (user, exerciseParameters) => {
  if (hasEmptyParameterFields(exerciseParameters)) return createErrorResponse('fields');
  if(notEnoughWordsAvailable(user, exerciseParameters)) return createErrorResponse('words')
  let result = [];


  //create a pool of words to randomly choose from
  let wordPool = [];

  //Notebook is all
  if (chosenBook == "all") {
    //Create an array with notebook keys to iterate on object with notebooks[keys[i]]
    let notebookNames = Object.keys(user.notebooks);

    //Words are random
    if (chosenType == "random") {
      for (let i = 0; i < notebookNames.length; i++) {
        wordPool.push(
          ...user.notebooks[notebookNames[i]].words.noun,
          ...user.notebooks[notebookNames[i]].words.verb,
          ...user.notebooks[notebookNames[i]].words.adjective,
          ...user.notebooks[notebookNames[i]].words.sentence,
          ...user.notebooks[notebookNames[i]].words.preposition,
          ...user.notebooks[notebookNames[i]].words.other
        );
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
    let userNotebook = user.notebooks[chosenBook].words;
    //random Words
    if (chosenType == "random") {
      wordPool.push(
        ...userNotebook.noun,
        ...userNotebook.verb,
        ...userNotebook.adjective,
        ...userNotebook.sentence,
        ...userNotebook.preposition,
        ...userNotebook.other
      );
    }
    //Specific Word Type Selected
    else {
      wordPool.push(...userNotebook[chosenType]);
    }
  }

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

const notEnoughWordsAvailable = (user, exerciseParameters) => {
  let { notebook, type, amount } = exerciseParameters;
  if (notebook != "all") return checkWordCountForSpecificNotebook(exerciseParameters, user)
  else if (book == "all") {
    if (type == "random") {
      if (amount >= user.totalWordCount) {
        console.log("You don't have enough words in selected notebok ");
        return true;
      }
    } else {
      let totalChosenType = 0;
      for (var key in user.notebooks) {
        totalChosenType += user.notebooks[key].words[type].length;
      }
      if (amount > totalChosenType) {
        console.log("You don't have enough words in selected notebok ");
        return true;
      }
    }
  }
  return false;
};

const checkWordCountForSpecificNotebook = ({type, notebook, amount}, user) => {
    //check word type = if it's random check total word count, else check word count of respective type
    if (type == "random") {
        if (amount >= user.notebooks[notebook].wordCount) {
          console.log("You don't have enough words in selected notebok ");
          return true;
        }
      }
      //a specific word type chosen
      else {
        if (amount >= user.notebooks[notebook].words[type].length) {
          console.log("You don't have enough words in selected notebok ");
          return true;
        }
      }
}

const createErrorResponse = (errorType) => {
    return ({
      error: true,
      message: errorType == 'fields' ? 'Please fill all fields' : 'Not enough words'
    })
  }

