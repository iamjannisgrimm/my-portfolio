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
      width: "100%", // You can adjust this to control the overall width
      maxWidth: "600px", // Add this to limit the width
      margin: "0 auto", // Center the input if desired
      position: "relative"
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        style={{
          width: "100%",
          padding: "8px 12px",
          paddingRight: "40px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px",
          backgroundColor: "#f9fafb",
          color: "#111827"
        }}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "4px",
          cursor: message.trim() ? "pointer" : "default",
          border: "none",
          background: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={message.trim() ? "#2563eb" : "#9ca3af"} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            transition: "stroke 0.2s ease"
          }}
        >
          {/* Circle */}
          <circle cx="12" cy="12" r="10" />
          {/* Up Arrow */}
          <path d="M12 16V8" />
          <path d="M8 11L12 8L16 11" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;