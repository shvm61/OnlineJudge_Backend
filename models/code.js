const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      unique: true,
    },
    lang: {
      type: String,
      unique: true,
      required: [true, "language is required"],
    },
    input: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Codes = mongoose.model("Code", codeSchema);

module.exports = Codes;
