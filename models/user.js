const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: [true, "handle is required"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
