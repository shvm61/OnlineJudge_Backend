const express = require("express");
const router = express.Router();

const codeController = require("../controllers/codeController");

router.post("/compile", codeController.codeCompile);

module.exports = router;
