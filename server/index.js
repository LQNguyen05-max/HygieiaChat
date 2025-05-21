// api key
require("dotenv").config();
// console.log("API Key:", process.env.OPENAI_API_KEY); // Check if the API key is loaded correctly
const express = require("express");
const cors = require("cors");

const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// route to the user message and call the api
router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    const aiReply = completion.choices[0].message.content;
    res.json({ message: aiReply });
  } catch (e) {
    res.status(500).json({ error: "Error processing failed from OpenAI." });
  }
});

// setup OpenAI API
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.get("/api/responses", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// logging requests to the console (might not need this in production rn)
// Route to handle GET requests
app.get("/", (req, res) => {
  res.send("Hello! This is the server for the health assistance app.");
});

// Route to handle POST requests
app.post("/api/responses", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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
});

// Start the server
app.listen(PORT, () => console.log("Server running on port", PORT));

module.exports = router;
