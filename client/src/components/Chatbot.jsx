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
    <div>
      <h2>{t('nav.chatbot')}</h2>
      <div style={{ border: '1px solid gray', height: 300, overflowY: 'auto', padding: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <b>{msg.from === 'user' ? 'You' : 'Bot'}: </b> {msg.text}
          </div>
        ))}
      </div>
      <input
        placeholder={t('chatbot.help')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
