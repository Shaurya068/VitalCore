import React, { useState } from 'react';
import '../ChatBot.css';

function ChatBot() {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: '👋 Hi! Tell me your symptoms and I’ll help you identify a possible issue and suggest a doctor.'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyClsvLRh2w5ctB5lJoEXzdHTNrXJplnnpI',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `You are a healthcare assistant AI. When a user describes their symptoms, respond in this specific structured format:

1. Begin with: "Based on the symptoms described, the following conditions might be possible:"
2. List 1–2 possible issues (just the names and short explanation)
3. Then say: "Recommended Specialist:" and mention the type of doctor (e.g., General Physician, Cardiologist, etc.)
4. End with: "Precautions and When to Seek Immediate Help:" and list a few serious signs to watch for.

Do not use markdown (*, **, etc.). Write in clear, clean, professional English.

User symptoms: ${input}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();
            const botText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "⚠ I couldn't process that.";
            setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: '🚨 Error connecting to Gemini API.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">🩺 HealthBot</div>
            <div className="chatbot-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chatbot-msg ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="chatbot-msg bot">Typing...</div>}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    placeholder="Type your symptoms..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>Send</button>
            </div>
        </div>
    );
}

export default ChatBot;
