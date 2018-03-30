const express = require("express");
const router = express.Router();

// Note that the sequence of routes are very important.
router.use("/api/1", require("./api/1"));
router.use("/", require("./web"));

module.exports = router;
