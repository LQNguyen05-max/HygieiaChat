import { AlignRight, LucideAlignRight, X } from "lucide-react";

export default function InfoPanel({ onClose }) {
    
    return (
        // This is the InfoPanel component that provides information about the chatbot
        <div className="info-panel">
            <div className="info-panel-header">
                <h2 className="info-panel-title">About Us</h2>
                <button onClick={onClose} className="info-panel-close" >
                    <X size={24} />
                </button>
            </div>
            {/* Content Materials */}
            <div className="info-panel-content">
                <section className="info-panel-section">
                    <h3 className="info-panel-section-title">What is HygieiaBot?</h3>
                    <p className="text-sm text-gray-600">
                        HygieiaBot is an AI-powered chatbot designed to help you understand your own medical needs.
                    </p>
                </section>
                {/* Instruction Manual */}
                <section className="info-panel-instruction-manual">
                    <h3 className="instruction-manual">
                        HOW TO USE
                    </h3>
                    <p className="instruction-manual-enter">
                        Simply type in your question related to health in the chat bot and press Enter. The HygieiaBot will provide you with information and resources.
                    </p>
                    <p className="instruction-manual-example-questions">
                        Example Questions:
                    </p>
                    <ul className="example-list">
                        <li>What is the black plaque?</li>
                        <li>Explain diabetes mellitus</li>
                        <li>What causes migraines?</li>
                        <li>Define arrhythmia</li>
                    </ul>
                </section>

                <section>
                    <h3 className="info-panel-limitations">LIMITATIONS</h3>
                        <p className="info-panel-limitations-quotas">
                            Please note that while HygieiaBot can provide information, it is not a substitute for professional medical advice. <br />
                            It is not the following:
                        </p>
                        <ul className="info-panel-limitations-quotas-list">
                            <li>A substitute for professional medical advice</li>
                            <li>A comprehensive medical encyclopedia</li>
                            <li>A replacement for a doctor or healthcare provider</li>
                        </ul>
                </section>
                <section>
                    <h3 className="info-panel-disclaimer">DISCLAIMER</h3>
                    <p className="info-panel-disclaimer-text">
                        The information provided by HygieiaBot is for informational purposes only. Always consult your healthcare provider or other qualified health professional with any questions you may have regarding a medical condition.
                    </p>
                </section>

            </div>
        </div>          
    )
}