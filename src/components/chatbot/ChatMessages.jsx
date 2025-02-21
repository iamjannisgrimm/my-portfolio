import React from "react";

function ChatMessages({ messages, isLoading }) {
  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        marginBottom: "20px",
        padding: "20px 0",
      }}
    >
      {/* Define keyframe animations */}
      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .message-animate {
            animation: slideUpFade 0.5s ease forwards;
          }
          @keyframes blinkDots {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          .typing-dots span {
            display: inline-block;
            animation: blinkDots 1s infinite;
          }
          .typing-dots span:nth-child(1) { animation-delay: 0s; }
          .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
          .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        `}
      </style>
      {messages.map((msg, index) => (
        <div
          key={index}
          className="message-animate"
          style={{
            textAlign: msg.sender === "user" ? "right" : "left",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "10px 16px",
              textAlign: msg.sender === "user" ? "right" : "left",
              marginRight: msg.sender === "user" ? "40px" : "0",
              borderRadius: "12px",
              background: msg.sender === "user" ? "#2563eb" : "#f3f4f6",
              color: msg.sender === "user" ? "#ffffff" : "#111827",
              maxWidth: "80%",
              wordWrap: "break-word",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}
      {isLoading && (
        <div
          className="message-animate"
          style={{
            textAlign: "left",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "10px 16px",
              borderRadius: "12px",
              background: "#f3f4f6",
              color: "#111827",
              maxWidth: "80%",
              wordWrap: "break-word",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            Thinking
            <span className="typing-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;