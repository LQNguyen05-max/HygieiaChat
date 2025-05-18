import { useState } from "react";
import {Info, X, Menu} from "lucide-react";
import MedicalChatbot from "../../components/MedicalChatbot.jsx";
import InfoPanel from "../../components/InfoPanel.jsx";

export default function Home() {
    const [showInfo, setShowInfo] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            MediTerms
          </h1>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">About</h2>
          <p className="text-sm text-gray-600 mb-4">
            HygieiaBot is an AI-powered chatbot designed to help you understand your own medical needs.
          </p>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 mt-6">Example Questions</h2>
          <ul className="space-y-2">
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">What is hypertension?</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Explain diabetes mellitus</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">What causes migraines?</li>
            <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Define arrhythmia</li>
          </ul>
        </div>
        <div className="mt-auto p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2025 HygieiaChat. This is for informational purposes only and not a substitute for professional medical
            advice.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-4 text-gray-600" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-blue-600 md:hidden flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              HygieiaChat
            </h1>
          </div>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Information"
          >
            {showInfo ? <X size={24} /> : <Info size={24} />}
          </button>
        </header>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Example Questions</h2>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">What is hypertension?</li>
              <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Explain diabetes mellitus</li>
              <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">What causes migraines?</li>
              <li className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Define arrhythmia</li>
            </ul>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => setShowMobileMenu(false)}>
              Close
            </button>
          </div>
        )}

        {/* Main content area with chat and info panel */}
        <div className="flex-1 flex overflow-hidden">
          <div className={`flex-1 ${showInfo ? "hidden md:block" : "block"}`}>
            <MedicalChatbot />
          </div>

          {showInfo && (
            <div className="flex-1 md:w-1/3 md:flex-none">
              <InfoPanel onClose={() => setShowInfo(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
