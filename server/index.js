// Load environment variables
require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const { getApp } = require("firebase/app");
const { auth } = require("./lib/firebase");
const authRoutes = require("./routes/auth");
const { signInWithEmailAndPassword } = require("firebase/auth");

const { OpenAI } = require("openai");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// JWT Key
const JWT_SECRET = process.env.JWT_SECRET;

// Admin SDK for Firebase
const admin = require("./config/firebaseAdmin");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token is required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Setup OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// check if API key is set
// console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`),

// Middleware
app.use(cors());
app.use(express.json());

// Imported protected routes to server files
const protectedRoutes = require("./routes/protected");
const contactRoutes = require("./routes/contact");

app.use("/api/protected", protectedRoutes, authenticateJWT, (req, res) => {
  res.json({ message: "Protected route accessed successfully." });
});

app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Generate JWT Token
    const token = jwt.sign(
      {
        uid: user.uid,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // console.log("Generate Token:", token);

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(401).json({ error: "Invalid email or password." });
  }
});

// Firebase admin SDK initialization
app.post("/api/auth/google", async (req, res) => {
  console.log("Received ID Token:", req.body.idToken); // Log the received token
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token is required." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log("Decoded Token:", decodedToken);
    const { uid, email } = decodedToken;

    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ error: "Invalid ID token." });
  }
});

// POST route: Handles user message and returns GPT response
app.post("/api/responses", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are HygieiaBot, an AI HealthCare Assistant. 
          You are created by a group of 4 guys from the University of Texas at Dallas.
          You are a friendly and helpful assistant. Your goal is to provide accurate and safe medical information to users.
          Always give short, friendly, and medically safe answers. 
          Never diagnose or prescribe. If someone asks about medication, explain what it's used for. 
          If symptoms are mentioned, gently suggest what you think is the problem, but always recommend seeing a doctor to confirm.
          If the user asks about a specific medication, provide information about its use and side effects.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.6,
      max_tokens: 200,
    });

    const botReply = completion.choices[0].message.content;
    res.json({ message: botReply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI." });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("HygieiaBot server is up!");
});

// File upload route
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  res.json({ message: "File uploaded successfully.", file: req.file });
});

// Receipt email route
const nodemailer = require("nodemailer");

app.post("/api/send-receipt", async (req, res) => {
  const { email, receipt } = req.body;
  if (!email || !receipt) {
    return res.status(400).json({ error: "Email and receipt are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"HygieiaChat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "HygieiaChat - Chat Receipt",
      html: receipt,
    });
    res.json({ success: true, message: "Receipt sent successfully." });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send receipt." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
