import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css'; // Ensure this matches the actual file name

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newChat = [...chat, { sender: 'user', text: message }];
    setChat(newChat);

    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', { message });
      setChat([...newChat, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChat([...newChat, { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    }

    setMessage('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {chat.map((chatItem, index) => (
          <div key={index} className={`chatbot-message ${chatItem.sender}`}>
            <div className="message-text">{chatItem.text}</div>
          </div>
        ))}
      </div>
      <form className="chatbot-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chatbot-input"
          placeholder="Type a message..."
        />
        <button type="submit" className="chatbot-button">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
