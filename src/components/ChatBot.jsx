import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send, X, User, Zap } from 'lucide-react';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "I'm Gemini, your Bharat Yatra AI. I can help you plan itineraries, find hidden gems, and navigate your journey across India. **How can I help you explore today?**", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMsg = { id: Date.now() + 1, text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = { id: Date.now() + 1, text: "I'm having trouble connecting to my servers. Please check your connection or try again later.", sender: 'bot' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <Sparkles size={24} />
                    <span className="toggle-label">Ask Gemini</span>
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="header-info">
                            <div className="gemini-sparkle">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3>Gemini <span className="gemini-badge">Travel AI</span></h3>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                <div className={msg.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}>
                                    {msg.sender === 'bot' ? <Sparkles size={18} /> : <User size={18} />}
                                </div>
                                <div className="message-text">
                                    {msg.sender === 'bot' ? (
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-wrapper bot">
                                <div className="bot-avatar">
                                    <Sparkles size={18} />
                                </div>
                                <div className="gemini-loading">
                                    <span className="gemini-dot"></span>
                                    <span className="gemini-dot"></span>
                                    <span className="gemini-dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-container">
                        <div className="chatbot-input-wrapper">
                            <input
                                type="text"
                                placeholder="Ask Gemini anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button className="gemini-send-btn" onClick={handleSend} disabled={isLoading || !input.trim()}>
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
