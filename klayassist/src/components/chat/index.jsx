// ChatApp.js
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false); // Add state for tracking sending status

  const streamResponse = useCallback(async function (message) {
    try {
      const response = await fetch("http://127.0.0.1:5123/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!response.ok) {
        console.error("Error sending message:", response.statusText);
        // TODO: Handle error
        return;
      }

      // Stream response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiMessage = decoder.decode(value);
      }
      setMessages((messages) => [...messages, { text: aiMessage, type: "llm" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  const handleSendMessage = useCallback(
    async function (inputMessage) {
      setSending(true); // Set sending to true when starting to send a message
      setInputMessage("");
      setMessages((messages) => [...messages, { text: inputMessage, type: "user" }]);

      try {
        await streamResponse(inputMessage); // Wait for the response
      } finally {
        setSending(false); // Set sending back to false after the response is received (success or error)
      }
    },
    [streamResponse]
  );

  console.log(messages);

  return (
    <div className="chat-container">
      <div className="chat-header">KlayAssist</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type === "user" ? "user" : "llm"}`}>
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
        <button onClick={() => handleSendMessage(inputMessage)} className="send-button">
          {sending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
