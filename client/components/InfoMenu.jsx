import { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function InfoMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating open button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[100] bg-mint-700 text-white p-3 rounded-full shadow-lg hover:bg-mint-800 transition-colors flex items-center gap-2"
          aria-label="Open information menu"
        >
          <Info size={24} />
        </button>
      )}

      {/* Centered modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30">
          <div className="relative bg-white border-4 border-mint-500 rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 flex flex-col items-center text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
              aria-label="Close information menu"
            >
              <X size={28} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-mint-700" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">HygieiaBot</h2>
            </div>
            <div className="space-y-8 w-full">
              <section>
                <h3 className="text-lg font-semibold text-mint-700 mb-2 uppercase tracking-wide">About</h3>
                <p className="text-gray-700">HygieiaBot is an AI-powered chatbot designed to help you understand your own medical needs.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-mint-700 mb-2 uppercase tracking-wide">How to Use</h3>
                <p className="text-gray-700">Simply type in your question related to health in the chat bot and press Enter. The HygieiaBot will provide you with information and resources.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-mint-700 mb-2 uppercase tracking-wide">Example Questions</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto inline-block text-left">
                  <li>What is the black plague?</li>
                  <li>Explain diabetes mellitus.</li>
                  <li>What causes migraines?</li>
                  <li>Define arrhythmia.</li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-mint-700 mb-2 uppercase tracking-wide">Limitations</h3>
                <p className="text-gray-700 mb-1">Please note that while HygieiaBot can provide information, it is not a substitute for professional medical advice. It is not the following:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto inline-block text-left">
                  <li>A substitute for professional medical advice</li>
                  <li>A comprehensive medical encyclopedia</li>
                  <li>A replacement for a doctor or healthcare provider</li>
                </ul>
              </section>
              <section className="bg-mint-50 border border-mint-200 rounded-lg p-4 mx-auto w-full">
                <h3 className="text-lg font-semibold text-mint-700 mb-2 uppercase tracking-wide">Disclaimer</h3>
                <p className="text-gray-700">
                  The information provided by HygieiaBot is for informational purposes only. Always consult your healthcare provider or other qualified health professional with any questions you may have regarding a medical condition.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 