const express = require("express");
const admin = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "super"; // Replace with a secure key

router.post("/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Generate JWT
    const jwtToken = jwt.sign({ uid, email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ jwt: jwtToken });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ error: "Invalid ID token" });
  }
});

module.exports = router;
