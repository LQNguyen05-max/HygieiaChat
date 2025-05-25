import { useState } from "react";
import MedicalChatbot from "../components/MedicalChatbot";
import InfoMenu from "../components/InfoMenu";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message to chat log
    const userMessage = {
      message: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatLog((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      // Add bot response to chat log
      const botMessage = {
        message: data.message,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message to chat log
      const errorMessage = {
        message: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatLog((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">HygieiaChat</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <MedicalChatbot
            input={input}
            setInput={setInput}
            chatLog={chatLog}
            handleSend={handleSend}
            isBotTyping={isBotTyping}
            setChatLog={setChatLog}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            deleteIndex={deleteIndex}
            setDeleteIndex={setDeleteIndex}
          />
        </div>
      </div>
      <InfoMenu />
    </div>
  );
} 