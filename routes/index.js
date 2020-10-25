const express = require("express");
const router = express.Router();

console.log("router loaded");

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "hello",
  });
});

router.use("/code", require("./code"));
router.use("/user", require("./user"));

module.exports = router;
