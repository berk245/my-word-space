const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const User = require("../../models/userModel");

router.post("/start", async (req, res) => {
  const currentUser = await User.findOne({ _id: req.body.user["_id"] });
  //req => word amount

  if (currentUser.performanceData.firstTime) {
    currentUser.performanceData.firstTime = false;
  }
  currentUser.performanceData.exercisesStarted += 1;
  currentUser.performanceData.wordsSeen += req.body.wordAmount;
  currentUser.markModified("performanceData");
  await currentUser.save();
  res.status(200).send(currentUser);
});

router.post("/complete", async (req, res) => {
  const currentUser = await User.findOne({ _id: req.body.user["_id"] });

  //req => corrects
  currentUser.performanceData.exercisesCompleted += 1;
  currentUser.performanceData.correctAnswers += req.body.corrects;

  currentUser.markModified("performanceData");
  await currentUser.save();
  res.status(200).send(currentUser);
});

module.exports = router;
