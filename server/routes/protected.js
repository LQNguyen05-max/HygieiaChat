const express = require("express");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Define the protected route
router.get("/", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
