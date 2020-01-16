const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const User = require("../../models/userModel");

//update the Words

router.post("/", async (req, res) => {
  //req body {updateWord, oldWord, notebook}
  const currentUser = await User.findOne({ email: req.body.user });
  console.log(req.body);
  const notebook = req.body.updateData.notebook;
  const updateWord = req.body.updateData.updateWord;
  const oldWord = req.body.updateData.oldWord;
  const wordType = req.body.updateData.updateWord.type;

  const editNotebook = currentUser.notebooks[notebook][wordType];

  for (let i = 0; i < editNotebook.length; i++) {
    if (editNotebook[i].original == oldWord.original) {
      editNotebook[i] = updateWord;
    }
  }

  //Check if the word is in recentWords
  for (let i = 0; i < currentUser.recentWords.length; i++) {
    if (currentUser.recentWords[i].original == oldWord.original) {
      currentUser.recentWords[i] = updateWord;
    }
  }
  currentUser.markModified("notebooks");
  await currentUser.save();
  res.status(200).send(currentUser);
});

module.exports = router;
