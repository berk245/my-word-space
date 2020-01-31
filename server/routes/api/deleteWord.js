const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const User = require("../../models/userModel");

//Delete the Words
router.post("/", async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.user });
  console.log(req.body);
  const notebook = req.body.data.chosenNotebook;
  const wordType = req.body.data.type;
  const wordIndex = req.body.data.index;

  currentUser.notebooks[notebook].words[wordType].splice(wordIndex, 1);
  currentUser.notebooks[notebook].wordCount -= 1;
  //Check if the word is in recentWords, if yes remove it
  for (let i = 0; i < currentUser.recentWords.length; i++) {
    if (currentUser.recentWords[i].original == req.body.data.word.original) {
      currentUser.recentWords.splice(i, 1);
    }
  }
  currentUser.totalWordCount -= 1;
  currentUser.markModified("notebooks");
  await currentUser.save();
  res.status(200).send(currentUser);
});

module.exports = router;
