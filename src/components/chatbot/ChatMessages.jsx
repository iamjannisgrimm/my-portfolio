function ChatMessages({ messages }) {
  return (
    <div style={{ 
      maxHeight: "300px", 
      overflowY: "auto", 
      marginBottom: "20px",
      padding: "20px 0"
    }}>
      {messages.map((msg, index) => (
        <div 
          key={index} 
          style={{ 
            textAlign: msg.sender === "user" ? "right" : "left", 
            marginBottom: "12px"
          }}
        >
          <span style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: "12px",
            background: msg.sender === "user" ? "#2563eb" : "#f3f4f6",
            color: msg.sender === "user" ? "#ffffff" : "#111827",
            maxWidth: "80%",
            wordWrap: "break-word",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}>
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;