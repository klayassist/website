// ChatApp.js
import React, { useState } from "react";
import "./index.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message to the messages array
    setMessages([...messages, { text: inputMessage, type: "user" }]);

    // Simulate LLM response (replace with your logic)
    const llmResponse = "LLM responds: This is just a sample response.";

    // Add LLM message to the messages array
    setMessages([...messages, { text: llmResponse, type: "llm" }]);

    // Clear the input field
    setInputMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">KlayAssist</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "user" ? "user-message" : "llm-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
