const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const User = require("../../models/userModel");

//Add New notebook

router.post("/", async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.user });

  //Check if the user has a notebook object already
  if (!currentUser.notebooks) {
    currentUser.notebooks = {};
  }
  const notebookName = req.body.newNotebook;

  let notebookSchema = {
    noun: [],
    verb: [],
    adjective: [],
    sentence: [],
    preposition: [],
    other: []
  };
  if (!currentUser.notebooks[notebookName]) {
    currentUser.notebooks[notebookName] = notebookSchema;
  }
  currentUser.markModified("notebooks");
  await currentUser.save();
  res.status(200).send(currentUser);
});

module.exports = router;
