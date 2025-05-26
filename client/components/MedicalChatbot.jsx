import { useRef, useEffect, useState } from "react";
import { Send, Pencil, Trash2, Paperclip, FileType } from "lucide-react";

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
  const fileInputRef = useRef(null);
  const [showFileTypeMenu, setShowFileTypeMenu] = useState(false);
  const [selectFileType, setSelectFileType] = useState(null);

  // Map following file types to accept
  const fileTypeOptions = [
    { label: "PNG", accept: ".png", mime: "image/png" },
    { label: "PDF", accept: ".pdf", mime: "application/pdf" },
    { label: "JPEG", accept: ".jpeg", mime: "image/jpeg" },
    {
      label: "XLSX",
      accept: ".xlsx",
      mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    {
      label: "DOCX",
      accept: ".docx",
      mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  ];

  const handleFileTypeSelect = (option) => {
    setSelectFileType(option);
    setShowFileTypeMenu(false);
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("accept", option.accept);
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    // e.preventDefault();
    // if (!input) return;

    // File selection handling
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      // Check if the file upload was successful
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      setChatLog((prev) => [
        ...prev,
        {
          sender: "user",
          message: `File uploaded: ${file.name}`,
        },
      ]);
    } catch (error) {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "bot",
          message: `Error uploading file: ${error.message}`,
        },
      ]);
    }
  };

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
        <div className="p-4 border-b flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".png, .pdf, .jpeg, .docx, .xlsx"
            style={{ display: "none" }}
          />
          {/* Wrap the button and menu in a relative container */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowFileTypeMenu((prev) => !prev)}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Attach File"
            >
              <Paperclip
                className="cursor-pointer tetx-grey-100 hover:text-grey-800"
                size={20}
              />
            </button>
            {/* File Type Options - horizontal below the button */}
            {showFileTypeMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "0.5rem",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  zIndex: 10,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {fileTypeOptions.map((option, idx) => (
                  <div
                    key={option.label}
                    style={{
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      borderRight:
                        idx !== fileTypeOptions.length - 1
                          ? "1px solid #eee"
                          : "none",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => handleFileTypeSelect(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
