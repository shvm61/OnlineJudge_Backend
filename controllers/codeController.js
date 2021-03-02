const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { SUCCESS, FAILURE } = require("../utils/response");

const Code = require("../models/code");

module.exports.codeCompile = async (req, res) => {
  try {
    const code = req.body.code;
    const lang = req.body.lang;
    const input = req.body.input;

    let codeD = await Code.create(req.body);
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
      let data = { output: stdout, stderror: stderr, error: err, id: codeD.id };
      return res.status(200).json(SUCCESS(data));
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(FAILURE(error));
  }
};

module.exports.getCodeById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    let code = await Code.findById(id);
    let data = {
      code,
    };
    return res.status(200).json(SUCCESS(data));
  } catch (error) {
    console.log(error);
    return res.status(500).json(FAILURE(error));
  }
};
