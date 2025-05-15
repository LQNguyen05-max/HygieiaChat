"use client"

import { X } from "lucide-react"

export default function InfoPanel({ onClose }) {
  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-green-700">About MediTerms</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 md:hidden" aria-label="Close info panel">
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <section className="mb-6">
          <h3 className="text-md font-semibold text-green-600 mb-2">What is MediTerms?</h3>
          <p className="text-sm text-gray-600 mb-2">
            MediTerms is an AI-powered chatbot designed to help users understand medical terminology and concepts. It
            provides definitions and explanations for common medical terms in a conversational format.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-semibold text-green-600 mb-2">How to Use</h3>
          <p className="text-sm text-gray-600 mb-2">
            Simply type your question about a medical term in the chat box and press Enter or click the send button.
            MediTerms will provide you with a definition and additional information about the term.
          </p>
          <p className="text-sm text-gray-600">Example questions:</p>
          <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
            <li>What is hypertension?</li>
            <li>Define arrhythmia</li>
            <li>Explain diabetes mellitus</li>
            <li>What does MRI stand for?</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-semibold text-green-600 mb-2">Limitations</h3>
          <p className="text-sm text-gray-600 mb-2">
            MediTerms is designed to provide general information about medical terminology. It is not:
          </p>
          <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
            <li>A substitute for professional medical advice</li>
            <li>Capable of diagnosing conditions</li>
            <li>Able to provide treatment recommendations</li>
            <li>A comprehensive medical encyclopedia</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-semibold text-green-600 mb-2">Future Enhancements</h3>
          <p className="text-sm text-gray-600 mb-2">
            We're continuously working to improve MediTerms. Upcoming features include:
          </p>
          <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
            <li>Integration with medical databases for more comprehensive information</li>
            <li>User accounts to save conversation history</li>
            <li>Advanced AI capabilities for more natural conversations</li>
            <li>Medical image recognition and explanation</li>
          </ul>
        </section>

        <section>
          <h3 className="text-md font-semibold text-green-600 mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-600">
            The information provided by MediTerms is for educational purposes only and is not intended to be a
            substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
            physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>
      </div>
    </div>
  )
}
