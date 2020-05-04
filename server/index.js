const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");

dotenv.config();

const app = express();

//Connect to Auth DB
mongoose.connect(
  "mongodb+srv://newUser:123new@cluster0-oixaf.gcp.mongodb.net/deutschApp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

//midware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  if (req.url == "/" || req.url == "/login" || req.url == "/signup") {
    console.log(req);
    return next();
  } else {
    const rawheader = req.get("Authorization");
    var decoded = jwt.decode(rawheader);
    if (decoded != null) {
      req.body.user = decoded;
      return next();
    } else {
      res.status(205).send("Please sign in again!");
    }
  }
});

const addWords = require("./routes/api/addWords");
app.use("/api", addWords);

const exerciseRoutes = require("./routes/api/exerciseRoutes");
app.use("/exercise", exerciseRoutes);

const addNotebook = require("./routes/api/addNotebook");
app.use("/add-notebook", addNotebook);

const deleteWord = require("./routes/api/deleteWord");
app.use("/delete", deleteWord);

const updateWord = require("./routes/api/updateWord");
app.use("/edit", updateWord);

const signUp = require("./routes/Authentication/signUp");
app.use("/signup", signUp);

const login = require("./routes/Authentication/login");
app.use("/login", login);

//Handle Production
if (process.env.NODE_ENV === "production") {
  //Static Folder
  app.use(express.static(__dirname + "/public"));
  //Handle SPA
  app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
