import React, { useState } from "react";
// import { useRouter } from "next/router";
import MedicalChatbot from "../../components/MedicalChatbot";
import InfoPanel from "../../components/InfoPanel";
import UserProfile from "../../components/UserProfile";
import { getCustomReply } from "../../util/customReply";

// This is the main page of your Next.js application for right now.
export default function Home() {
  // create state for the chat and the input
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input) return;

    // timestamp for each message
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (editingIndex !== null) {
      // Update the existing message
      setChatLog((prev) =>
        prev.filter((_, i) => i !== editingIndex && i !== editingIndex + 1)
      );
      setEditingIndex(null);
    }
    // Add user message
    const userMessage = {
      sender: "user",
      message: input,
      timestamp: timeString,
    };
    setChatLog((prev) => [...prev, userMessage]);
    setInput("");

    // Check for custom replies
    const customReply = getCustomReply(input);
    if (customReply) {
      setIsBotTyping(true);
      setTimeout(() => {
        const botMessage = {
          sender: "bot",
          message: customReply,
          timestamp: timeString,
        };
        setChatLog((prev) => [...prev, botMessage]);
        setIsBotTyping(false);
      }, 1000);
      return;
    }
    setIsBotTyping(true);

    // Sending message to user
    const response = await fetch("http://localhost:5000/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    // Updating Chatlog with the bot's responses
    const botMessage = {
      sender: "bot",
      message: data.message,
      timestamp: timeString,
    };

    setChatLog((prev) => [...prev, botMessage]);
    setIsBotTyping(false);
  };

  return (
    // returns the display of the chatbot
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <UserProfile />
      <div className="app-container">
        <div className="main-layout">
          {showInfoPanel && (
            <InfoPanel
              onClose={() => setShowInfoPanel(false)}
              setInput={setInput}
            />
          )}
          <div className="medical-chatbot-container">
            <MedicalChatbot
              chatLog={chatLog}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isBotTyping={isBotTyping}
              setChatLog={setChatLog}
              setEditingIndex={setEditingIndex}
              deleteIndex={deleteIndex}
              setDeleteIndex={setDeleteIndex}
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
    </div>
  );
}
