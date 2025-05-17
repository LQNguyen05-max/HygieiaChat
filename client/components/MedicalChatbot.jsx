import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

// import { medicalKnowledgeBase } from "@/lib/medical-knowledge"

export default function MedicalChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "Hello! I'm Hygieia, your medical terminology assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking and generate response
    setTimeout(
      () => {
        const botResponse = generateResponse(input)
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: botResponse,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const generateResponse = (query) => {
    const normalizedQuery = query.toLowerCase()

    // Check for greetings
    if (/^(hi|hello|hey|greetings)/.test(normalizedQuery)) {
      return "Hello! How can I help you with medical terminology today?"
    }

    // Check for thanks
    if (/thank you|thanks/.test(normalizedQuery)) {
      return "You're welcome! Feel free to ask if you have more questions about medical terms."
    }

    // Check for goodbyes
    if (/bye|goodbye|see you|farewell/.test(normalizedQuery)) {
      return "Goodbye! Take care of your health and come back if you have more questions."
    }

    // Check for medical terms in our knowledge base
    for (const term in medicalKnowledgeBase) {
      // Check if the query contains the term or is asking about the term
      if (
        normalizedQuery.includes(term.toLowerCase()) ||
        normalizedQuery.includes(`what is ${term.toLowerCase()}`) ||
        normalizedQuery.includes(`define ${term.toLowerCase()}`) ||
        normalizedQuery.includes(`explain ${term.toLowerCase()}`)
      ) {
        const info = medicalKnowledgeBase[term]
        return `**${term}**: ${info.definition}\n\n${info.additionalInfo || ""}`
      }
    }

    // If no specific term is found, check for general categories
    if (/heart|cardiac|cardio/.test(normalizedQuery)) {
      return "I can provide information about various heart-related terms. Could you specify which cardiac term you'd like to learn about? For example: arrhythmia, myocardial infarction, or hypertension."
    }

    if (/diabetes|blood sugar|glucose/.test(normalizedQuery)) {
      return "I can provide information about diabetes and related terms. Would you like to know about Type 1 diabetes, Type 2 diabetes, or gestational diabetes?"
    }

    // Default response if no match is found
    return "I don't have specific information about that medical term. Could you try asking about another term or phrase your question differently?"
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-resize textarea as user types
  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }

  return (
    <div className="medical-chatbot-container">
      <div className="medical-chatbot-messages">
        <div className="medical-chatbot-inner">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`medical-chatbot-message-row ${message.sender}`}
            >
              <div
                className={`medical-chatbot-message ${message.sender}`}
              >
                {message.content.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className={i > 0 ? "mt-2" : ""}
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                ))}
                <div className="medical-chatbot-timestamp">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="medical-chatbot-typing">
              <div className="medical-chatbot-typing-bubble">
                <div className="medical-chatbot-typing-dot" style={{ animationDelay: "0ms" }}></div>
                <div className="medical-chatbot-typing-dot" style={{ animationDelay: "200ms" }}></div>
                <div className="medical-chatbot-typing-dot" style={{ animationDelay: "400ms" }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="medical-chatbot-input-area">
        <div className="medical-chatbot-input-row">
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
            onClick={handleSendMessage}
            disabled={input.trim() === "" || isTyping}
            className="medical-chatbot-send-btn"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="medical-chatbot-disclaimer">
          <p>
            Disclaimer: This chatbot provides general information about medical terms and is not a substitute for
            professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}