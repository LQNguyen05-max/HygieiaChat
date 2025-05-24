import { useRef, useEffect } from "react";
import { Send, Pencil, Trash2 } from "lucide-react";

export default function MedicalChatbot({
  input,
  setInput,
  chatLog,
  handleSend,
  isBotTyping,
  setChatLog,
  editingIndex,
  setEditingIndex,
  deleteIndex,
  setDeleteIndex,
}) {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  // Focus on the input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Enter a key event to send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Auto-resize textarea as user types
  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    // Chatbot UI on the right hand side of the screen
    <div className="medical-chatbot-container">
      <div className="medical-chatbot-messages">
        <div className="medical-chatbot-inner">
          <div className="medical-chatbot-message-row bot">
            <div className="medical-chatbot-message bot">
              Hello I am HygieiaBot, a HealthCare Assistance. How can I help you
              today?
            </div>
          </div>
          {chatLog.map((message, idx) => (
            <div
              key={idx}
              className={`medical-chatbot-message-row ${message.sender}`}
              style={{
                flexDirection: "column",
                alignItems:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div className={`medical-chatbot-message ${message.sender}`}>
                {message.message.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className={i > 0 ? "mt-2" : ""}
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong>$1</strong>"
                      ),
                    }}
                  />
                ))}
                {message.timestamp && (
                  <div className="medical-chatbot-timestamp">
                    {message.timestamp}
                  </div>
                )}
              </div>
              {message.sender === "user" && (
                <div
                  style={{
                    marginTop: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    type="button"
                    className="medical-chatbot-edit-action"
                    style={{
                      marginTop: "0.25rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      // setting to chatLog to edit the last message
                      if (editingIndex === idx) {
                        // can close the edit mode
                        setEditingIndex(null);
                        setInput("");
                      } else {
                        setInput(message.message);
                        setEditingIndex(idx);
                      }
                    }}
                  >
                    <Pencil size={16} />
                  </span>
                  <span
                    className="medical-chatbot-edit-action"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: "0.5rem",
                    }}
                    onClick={() => setDeleteIndex(idx)}
                  >
                    <Trash2 size={16} style={{ marginRight: "0.25rem" }} />
                  </span>
                </div>
              )}
            </div>
          ))}
          {/* Tying Indicator */}
          {isBotTyping && (
            <div className="medical-chatbot-message-row bot">
              <div className="medical-chatbot-message bot medical-chatbot-typing-bubble">
                <span className="medical-chatbot-typing-dot" />
                <span className="medical-chatbot-typing-dot" />
                <span className="medical-chatbot-typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input Area */}
      <div className="medical-chatbot-input-area">
        <form className="medical-chatbot-input-row" onSubmit={handleSend}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a medical term..."
            className="medical-chatbot-textarea"
            rows={1}
          />
          <button
            type="submit"
            disabled={input.trim() === ""}
            className="medical-chatbot-send-btn"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="medical-chatbot-disclaimer">
          <p>
            Disclaimer: This chatbot provides general information about medical
            terms and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
      {/* Deletion Modal */}
      {deleteIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <strong>Delete Message</strong>
            <p>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                className="modal-btn modal-btn-danger"
                onClick={() => {
                  setChatLog((prev) =>
                    prev.filter(
                      (_, i) => i !== deleteIndex && i !== deleteIndex + 1
                    )
                  );
                  setDeleteIndex(null);
                }}
              >
                Delete
              </button>
              <button
                className="modal-btn"
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
