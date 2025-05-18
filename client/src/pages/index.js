import { useState } from "react";
// import { useRouter } from "next/router";
import MedicalChatbot from "../../components/MedicalChatbot";
import InfoPanel from "../../components/InfoPanel";

// This is the main page of your Next.js application for right now.
export default function Home() {
  // create state for the chat and the input
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const [showInfoPanel, setShowInfoPanel] = useState(true);

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
    <div className="app-container">
      <div className="main-layout">
        {showInfoPanel && <InfoPanel onClose={() => setShowInfoPanel(false)} />}
        <div className="medical-chatbot-container">
          <MedicalChatbot
            chatLog={chatLog}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
          {!showInfoPanel && (
            <button
              className="reopen-info-panel"
              onClick={() => setShowInfoPanel(true)}
            >
              Show Info
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
