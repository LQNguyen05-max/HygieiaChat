// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;

// Setup OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// check if API key is set
//console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`),

// Middleware
app.use(cors());
app.use(express.json());

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
