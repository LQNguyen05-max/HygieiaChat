import { useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function MedicalChatbot({ input, setInput, chatLog, handleSend, isBotTyping  }) {
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
              Hello I am HygieiaBot, a HealthCare Assistance. How can I help you today?
            </div>
          </div>
          {chatLog.map((message, idx) => (
            <div
              key={idx}
              className={`medical-chatbot-message-row ${message.sender}`}
            >
              <div className={`medical-chatbot-message ${message.sender}`}>
                {message.message
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      className={i > 0 ? "mt-2" : ""}
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ))}
                {message.timestamp && (
                  <div className="medical-chatbot-timestamp">
                    {message.timestamp}
                  </div>
                )}
              </div>
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
            Disclaimer: This chatbot provides general information about medical terms and is not a substitute for
            professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}