import { useState } from "react";

// This is the main page of your Next.js application for right now.
export default function Home() {
  // create state for the chat and the input
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input) return;
    // user sending a message and set the chat log
    const userMessage = { sender: "user", message: input };
    const prevLog = [...chatLog, userMessage];
    setChatLog((prevLog) => {
      const updateLog = [...prevLog];
      updateLog[updateLog.length - 1] = { sender: "bot", message: "..." };
      return updateLog;
    });

    const newLog = [...chatLog, userMessage];

    setInput("");

    setChatLog([
      prevLog,
      userMessage,
      { sender: "bot", message: "Bot is Typing..." },
    ]);
    setInput("");

    // send message to the serverwhere
    const response = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    // use data.message if you are using the server
    setChatLog([...newLog, { user: "AI", message: data.message }]);
    setInput("");
  };

  return (
    // current display of the chatbot, we will move this to a component later!
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">🩺 AI Health Chatbot</h1>

        <div className="h-80 overflow-y-auto mb-4 border p-2 bg-gray-50">
          {chatLog.map((entry, idx) => (
            <div
              key={idx}
              className={entry.sender === "user" ? "text-right" : "text-left"}
            >
              <strong>{entry.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {entry.message}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a health question..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
