import { useState } from "react";

export default function Home() {
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input) return;

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
      { sender: "bot", message: "..." }, // Placeholder for AI response
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

    // try a random question reply:

    const data = await response.json();
    // use data.message if you are using the server
    setChatLog([...newLog, { user: "AI", message: data.message }]);
    setInput("");
  };

  return (
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
