import { AlignRight, LucideAlignRight, X } from "lucide-react";

export default function InfoPanel({ onClose, setInput, isOpen }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Info Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <img
                src="hybot.png"
                alt="Hygieia Bot Logo"
                className="w-9 h-11 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              />
              <h2 className="text-xl font-semibold">HygieiaBot</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
              <p className="text-sm text-gray-600">
                HygieiaBot is an AI-powered chatbot designed to help you understand
                your own medical needs.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">HOW TO USE</h3>
              <p className="text-sm text-gray-600 mb-4">
                Simply type in your question related to health in the chat bot and
                press Enter. The HygieiaBot will provide you with information and
                resources.
              </p>
              <p className="text-sm font-semibold mb-2">EXAMPLE QUESTIONS:</p>
              <ul className="space-y-2">
                {[
                  "What is the black plague?",
                  "Explain diabetes mellitus.",
                  "What causes migraines?",
                  "Define arrhythmia."
                ].map((question, index) => (
                  <li 
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">LIMITATIONS</h3>
              <p className="text-sm text-gray-600 mb-2">
                Please note that while HygieiaBot can provide information, it is not
                a substitute for professional medical advice. It is not the following:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>A substitute for professional medical advice</li>
                <li>A comprehensive medical encyclopedia</li>
                <li>A replacement for a doctor or healthcare provider</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">DISCLAIMER</h3>
              <p className="text-sm text-gray-600">
                The information provided by HygieiaBot is for informational purposes
                only. Always consult your healthcare provider or other qualified
                health professional with any questions you may have regarding a
                medical condition.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
