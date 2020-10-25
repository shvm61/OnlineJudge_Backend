const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const saltRounds = 10;

module.exports.signUp = async (req, res) => {
  try {
    const errors = {};
    if (!validator.isEmail(req.body.email.trim()))
      errors.email = "Email is not valid";
    if (validator.isEmpty(req.body.password.trim()))
      errors.password = "Password is not valid";
    if (validator.isEmpty(req.body.handle.trim()))
      errors.handle = "Handle is not valid";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hash;
    let user = await User.create(req.body);
    user = user.toObject();
    delete user.password;
    // console.log(user);
    let token = jwt.sign(user, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    console.log("error", err);
    if (err.code === 11000) {
      const handle = err.keyValue.handle;
      if (handle) {
        return res.status(400).json({
          success: false,
          handle: "this handle is already taken",
        });
      }
      const email = err.keyValue.email;
      if (email) {
        return res.status(400).json({
          success: false,
          email: "this email is already taken",
        });
      }
    }
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = {};
    if (!validator.isEmail(req.body.email.trim()))
      errors.email = "Email is not valid";
    if (validator.isEmpty(req.body.password.trim()))
      errors.password = "Password is not valid";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(422)
        .json({ success: false, error: "Inavlid username or password" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      user = user.toObject();
      delete user.password;
      return res.status(200).json({
        success: true,
        message: "Sign in successful, here is your token, please keep it safe!",
        token: jwt.sign(user, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRY,
        }),
      });
    } else {
      return res
        .status(422)
        .json({ success: false, error: "Inavlid username or password" });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ success: false, error: err });
  }
};
