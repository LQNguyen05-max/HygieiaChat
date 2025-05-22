import { AlignRight, LucideAlignRight, X } from "lucide-react";

export default function InfoPanel({ onClose, setInput}) {
    return (
        // Info Panel, on the left handle of the screen with a close button
        <div className="info-panel">
            <div className="info-panel-header">
                {/* logo */}
                <img src="hybot.png" 
                alt="Hygieia Bot Logo" 
                className="info-panel-logo"
                style={{width: 37, height: 45}} 
                // logo click to home page
                onClick={() => window.location.href = "/home"} />
                <h2 className="info-panel-title">HygieiaBot</h2>
                <button onClick={onClose} className="info-panel-close" >
                    <X size={24} />
                </button>
            </div>
            {/* Info Panel Content */}
            <div className="info-panel-content">
                <section className="info-panel-section">
                    <h3 className="info-panel-section-title">ABOUT</h3>
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
                        EXAMPLE QUESTIONS:
                    </p>
                    {/* Example Questions */}
                    <ul className="example-list">
                        <ol onClick={() => setInput("What is the black plague?")}>What is the black plague?</ol>
                        <ol onClick={() => setInput("Explain diabetes mellitus.")}>Explain diabetes mellitus.</ol>
                        <ol onClick={() => setInput("What causes migraines?")}>What causes migraines?</ol>
                        <ol onClick={() => setInput("Define arrhythmia.")}>Define arrhythmia.</ol>
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