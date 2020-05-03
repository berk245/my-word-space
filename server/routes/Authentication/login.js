const router = require("express").Router();
const User = require("../../models/userModel");
const { loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(203).send(error.details[0].message);

  //checking if the e-mail is already in database
  const registeredUser = await User.findOne({ email: req.body.email });
  if (!registeredUser)
    return res.status(203).send("E-mail or password is incorrect");

  //check if the password is correct
  const validPass = await bcrypt.compare(
    req.body.password,
    registeredUser.password
  );
  if (!validPass) return res.status(203).send("Password is Incorrect");

  //Create and Assign a Token
  const token = jwt.sign(
    { _id: registeredUser._id },
    "asdsadASADsadaskmkmöcscmvscvçfdkmbf",
    { expiresIn: 60000 }
  );
  res.header("token", token);

  //Update the logins of the user
  let currentDate = new Date();
  let formattedDate =
    currentDate.getDate() +
    "/" +
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getFullYear() +
    " at " +
    currentDate.getHours() +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);
  registeredUser.logins.unshift(formattedDate);

  await registeredUser.save();

  // if (registeredUser.logins.length > 1) {
  //   var lastActive = registeredUser.logins[1];
  // }
  // console.log(registeredUser);
  // let curUser = {
  //   username: registeredUser.name,
  //   userNotebooks: registeredUser.notebooks,
  //   recentWords: registeredUser.recentWords,
  //   email: registeredUser.email,
  //   lastLogin: lastActive
  // };
  res.send(registeredUser);
  // console.log(registeredUser);
});

module.exports = router;
