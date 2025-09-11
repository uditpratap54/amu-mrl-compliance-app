// client/src/components/Chatbot.js
// Minimal chatbot component hitting /api/chatbot

import React, { useState } from 'react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Welcome! How can I assist you?' }]);
  const { t } = useTranslation();

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    try {
      const reply = await api.chatbotQuery(input);
      setMessages((msgs) => [...msgs, { from: 'bot', text: reply }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Error, please try again.' }]);
    }
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>AMU/MRL Compliance Assistant</h2>
        <p>Ask questions about antimicrobial usage and compliance regulations</p>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`message ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask about compliance, withdrawal periods, MRL limits..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
