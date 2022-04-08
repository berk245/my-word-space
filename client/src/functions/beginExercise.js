function createWordPool(exerciseParameters, user) {
  console.log(user);

  for (var key in exerciseParameters) {
    if (exerciseParameters[key] == "") {
      return false;
    }
  }
  //all fields are filled
  let chosenBook = exerciseParameters.notebook;
  let chosenType = exerciseParameters.type;
  //a specific notebook chosen
  if (chosenBook != "all") {
    //check word type = if it's random check total word count, else check word count of respective type
    if (chosenType == "random") {
      if (exerciseParameters.amount >= user.notebooks[chosenBook].wordCount) {
        console.log("You don't have enough words in selected notebok ");
        return false;
      }
    }
    //a specific word type chosen
    else {
      if (
        exerciseParameters.amount >=
        user.notebooks[chosenBook].words[chosenType].length
      ) {
        console.log("You don't have enough words in selected notebok ");
        return false;
      }
    }
  } else if (chosenBook == "all") {
    if (chosenType == "random") {
      if (exerciseParameters.amount >= user.totalWordCount) {
        console.log("You don't have enough words in selected notebok ");
        return false;
      }
    } else {
      let totalChosenType = 0;
      for (var key in user.notebooks) {
        totalChosenType += user.notebooks[key].words[chosenType].length;
      }
      if (exerciseParameters.amount > totalChosenType) {
        console.log("You don't have enough words in selected notebok ");
        return false;
      }
    }
  }
}

module.exports = createWordPool;
