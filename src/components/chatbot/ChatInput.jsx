import { useState } from "react";

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: "flex", 
      gap: "8px",
      width: "100%"
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        style={{ 
          flex: 1, 
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px",
          backgroundColor: "#f9fafb",
          color: "#111827"
        }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: "8px 16px", 
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          fontSize: "16px",
          fontWeight: "500"
        }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;