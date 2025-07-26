import { useState } from "react";
import MedicalChatbot from "../components/MedicalChatbot";
import InfoPanel from "../components/InfoPanel";
import { Info } from "lucide-react";
import getCustomReply from "../util/customReply";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useEffect } from "react";

export default function ChatPage() {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  // Load chat log from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedChatLog = localStorage.getItem("medicalChatLog");
      if (storedChatLog) {
        setChatLog(JSON.parse(storedChatLog));
      }
    }
  }, []);

  // Save chat log to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("medicalChatLog", JSON.stringify(chatLog));
    }
  }, [chatLog]);

  // Handle input change
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

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

    try {
      // Sending message to user
      const response = await fetch("http://localhost:5000/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Updating Chatlog with the bot's responses
      const botMessage = {
        sender: "bot",
        message: data.message,
        timestamp: timeString,
      };

      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        sender: "bot",
        message: "Sorry, I encountered an error. Please try again.",
        timestamp: timeString,
      };
      setChatLog((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleClearChat = () => {
    setChatLog([]);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("medicalChatLog");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HygieiaChat</h1>
          <div className="flex flex-col items-end">
            <button
              onClick={() => setIsInfoPanelOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open Info Panel"
            >
              <Info size={24} />
            </button>
            <button
              onClick={handleClearChat}
              className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              style={{ minWidth: 100 }}
            >
              Clear Chat
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <MedicalChatbot
            user={user}
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
      <InfoPanel
        isOpen={isInfoPanelOpen}
        onClose={() => setIsInfoPanelOpen(false)}
        setInput={setInput}
      />
    </div>
  );
}
