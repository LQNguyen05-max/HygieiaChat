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

    if (editingIndex !== null) {
      // Edit existing user message
      setChatLog((prev) =>
        prev.map((msg, idx) =>
          idx === editingIndex
            ? { ...msg, message: input, timestamp: new Date().toLocaleTimeString() }
            : msg
        )
      );
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
        setChatLog((prev) => {
          // Replace the bot message after the edited user message, if it exists and is from the bot
          const updated = prev.map((msg, idx) => {
            if (idx === editingIndex + 1 && msg.sender === "bot") {
              return {
                ...msg,
                message: data.message,
                timestamp: new Date().toLocaleTimeString(),
              };
            }
            return msg;
          });
          // If there is no bot message after, add one
          if (!(prev[editingIndex + 1] && prev[editingIndex + 1].sender === "bot")) {
            updated.splice(editingIndex + 1, 0, {
              message: data.message,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString(),
            });
          }
          return updated;
        });
      } catch (error) {
        console.error("Error:", error);
        setChatLog((prev) => {
          const updated = prev.map((msg, idx) => {
            if (idx === editingIndex + 1 && msg.sender === "bot") {
              return {
                ...msg,
                message: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date().toLocaleTimeString(),
              };
            }
            return msg;
          });
          if (!(prev[editingIndex + 1] && prev[editingIndex + 1].sender === "bot")) {
            updated.splice(editingIndex + 1, 0, {
              message: "Sorry, I encountered an error. Please try again.",
              sender: "bot",
              timestamp: new Date().toLocaleTimeString(),
            });
          }
          return updated;
        });
      } finally {
        setIsBotTyping(false);
        setEditingIndex(null);
        setInput("");
      }
      return;
    }

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