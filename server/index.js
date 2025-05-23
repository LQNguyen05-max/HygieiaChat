<<<<<<< HEAD
// api key
require("dotenv").config();
console.log("API Key:", process.env.OPENAI_API_KEY); // Check if the API key is loaded correctly

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
=======
// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
>>>>>>> 7ceb2666bcd79a6deba1ccebe7a9f6c5267846c9

const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.use(cors());
app.use(express.json());

// setup OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// good thing we know the client is running
app.get("/api/ask", (req, res) => {
  res.json({ message: "Hello! How can I assist you today?" });
});

// Route to handle POST requests
app.post("/api/ask", async (req, res) => {
=======
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
>>>>>>> 7ceb2666bcd79a6deba1ccebe7a9f6c5267846c9
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
<<<<<<< HEAD
      model: "gpt-4.0=turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
=======
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
>>>>>>> 7ceb2666bcd79a6deba1ccebe7a9f6c5267846c9
    });

    const botReply = completion.choices[0].message.content;
    res.json({ message: botReply });
  } catch (error) {
<<<<<<< HEAD
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }

  //   const fakeReply =
  //     "I am not a doctor, but I can help you with general health information. Please consult a healthcare professional for specific medical advice.";
});

// Start the server
app.listen(PORT, () => console.log("Server running on port", PORT));
=======
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
>>>>>>> 7ceb2666bcd79a6deba1ccebe7a9f6c5267846c9
