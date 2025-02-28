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
        width: isAnchored ? "120%" : "100%", // Expanded even more when anchored
        maxWidth: isAnchored ? "950px" : "750px", // Increased max width when anchored
        position: "relative",
        left: isAnchored ? "50%" : "45%", // Keeps it centered
        transform: "translateX(-50%)", // Ensures it expands evenly to both sides
        transition: "width 0.3s ease-in-out, max-width 0.3s ease-in-out"
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        style={{
          width: "100%",
          padding: isAnchored ? "20px 50px 20px 25px" : "12px 50px 12px 20px",
          borderRadius: isAnchored ? "14px" : "10px", // Increased corner radius when anchored
          border: isAnchored ? "1px solid transparent" : "1.4px solid #d1d5db",
          fontSize: isAnchored ? "17px" : "16px",
          backgroundColor: "#ffffff",
          color: "#111827",
          transition: "all 0.3s ease-in-out",
          outline: "none", // Removes default focus border/outline
          fontFamily: "SF Pro, sans-serif", // Applied SF Pro font
          transition: "all 0.3s ease-in-out, border 0.3s ease-in-out, padding 0.3s ease-in-out"
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