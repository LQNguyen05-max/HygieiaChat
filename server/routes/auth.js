const express = require("express");
const admin = require("../config/firebaseAdmin"); // Import Firebase Admin SDK
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/google", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token is required." });
  }

  try {
    // Verify the Google ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log("Decoded Token:", decodedToken);

    const { uid, email, name, picture } = decodedToken;

    // Generate a custom JWT token for the user (optional)
    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Authentication successful",
      user: { uid, email, name, picture },
      token, // Custom JWT token
    });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ error: "Invalid ID token." });
  }
});

module.exports = router;
