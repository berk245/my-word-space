const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const User = require("../../models/userModel");

//Get the Words
router.get("/", async (req, res) => {
  const words = await loadUserData();
  res.send(await words.find({}).toArray());
});

//Add New Words

router.post("/", async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.user });
  const userNotebook = req.body.newWord.notebook;
  const wordType = req.body.newWord.type;

  const wordData = {
    original: req.body.newWord.original,
    translation: req.body.newWord.translation,
    type: wordType
  };
  currentUser.notebooks[userNotebook].words[wordType].unshift(wordData);
  //update the notebook wordcount
  currentUser.notebooks[userNotebook].wordCount += 1;

  currentUser.recentWords.unshift(wordData);
  //If the recent words list is longer than 20 words, take out the last one
  if (currentUser.recentWords.length > 10) {
    currentUser.recentWords.pop();
  }
  currentUser.totalWordCount += 1;
  currentUser.markModified("notebooks");
  await currentUser.save();
  res.status(200).send(currentUser);
});

async function loadUserData() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://newUser:123new@cluster0-oixaf.gcp.mongodb.net/admin?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db("deutschApp").collection("data&users");
}

module.exports = router;
