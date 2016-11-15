/**
 * API 路由。
 */

const express = require("express");
const router = express.Router();

// just a test.
router.get("/hello", (req, res) =>
{
    res.json({ msg: "Hello World!" });
});

module.exports = router;
