// api key
require("dotenv").config();
console.log("API Key:", process.env.OPENAI_API_KEY); // Check if the API key is loaded correctly

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;

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
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.0=turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
    });

    const botReply = completion.choices[0].message.content;
    res.json({ message: botReply });
  } catch (error) {
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
