const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 8000;
require("dotenv").config();
const db = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy.js");

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

app.use(passport.initialize());
app.use("/api", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
