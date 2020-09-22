const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const router = express.Router();

// const reportController = require("../controllers/report_controller");
console.log("router loaded");

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "hello",
  });
});

router.post("/", (req, res) => {
  try {
    const code = req.body.code;
    const lang = req.body.lang;
    const input = req.body.input;
    let file, command, fileNameWithoutExt;
    // console.log(code);
    if (lang === "cpp") {
      file = "main.cpp";
      fileNameWithoutExt = "main";
    }
    const codeFileLocation = path.join(__dirname, `../codes/${file}`);
    const inputFileLocation = path.join(__dirname, `../codes/input.txt`);
    const codeWithoutExtLocation = path.join(
      __dirname,
      `../codes/${fileNameWithoutExt}`
    );
    if (lang === "cpp") {
      command = `g++ ${codeFileLocation} -o ${codeWithoutExtLocation} && ${codeWithoutExtLocation} < ${inputFileLocation}`;
    }
    fs.writeFileSync(codeFileLocation, code);
    fs.writeFileSync(inputFileLocation, input);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
      }
      if (stderr) {
        console.error(`exec error: ${stderr}`);
      }
      return res.status(200).json({
        success: true,
        output: stdout,
        stderror: stderr,
        error: err,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

// && echo && g++ main.cpp -o main && ./main
module.exports = router;
