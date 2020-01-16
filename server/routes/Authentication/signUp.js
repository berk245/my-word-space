const router = require("express").Router();
const User = require("../../models/userModel");
const { registerValidation } = require("./validation");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(202).send(error.details[0].message);

  //Check if the email already exists in DB
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(202).send("E-mail already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let currentDate = new Date();
  let formattedDate =
    currentDate.getDate() +
    "/" +
    currentDate.getMonth() +
    "/" +
    currentDate.getFullYear() +
    " at " +
    currentDate.getHours() +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);

  const newUser = new User({
    //from the user model in models file
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    totalWordCount: 0,
    recentWords: [],
    logins: [formattedDate],
    notebooks: new Object()
  });
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
