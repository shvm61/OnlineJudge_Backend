const express = require("express");
const router = express.Router();

const codeController = require("../controllers/codeController");

router.post("/compile", codeController.codeCompile);
router.get("/:id", codeController.getCodeById);

module.exports = router;
