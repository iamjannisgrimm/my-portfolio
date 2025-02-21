import React, { useState } from "react";

function ChatInput({ onSendMessage, isAnchored }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        width: "100%",
        margin: "0 auto",
        position: "relative"
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        style={{
          width: "100%",
          padding: isAnchored ? "16px 44px 16px 20px" : "8px 40px 8px 12px",
          borderRadius: "6px",
          border: isAnchored ? "none" : "1px solid #d1d5db",
          fontSize: isAnchored ? "17px" : "16px",
          backgroundColor: isAnchored ? "#ffffff" : "transparent",
          color: "#111827",
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none" // Removes the default focus border/outline
        }}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        style={{
          position: "absolute",
          right: isAnchored ? "12px" : "8px",
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
          style={{ transition: "stroke 0.2s ease" }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16V8" />
          <path d="M8 11L12 8L16 11" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;