import { useState } from "react";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { getChatbotResponse } from "../../services/openaiservice.js";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const botResponseText = await getChatbotResponse(message);
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response.", sender: "bot" }
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      position: isActive ? "fixed" : "relative",
      bottom: isActive ? "0" : "auto",
      left: "0",
      width: "100%",
      transition: "all 0.3s ease-in-out",
      zIndex: 1000
    }}>
      {/* Messages Container */}
      {isActive && messages.length > 0 && (
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "0",
          width: "100%",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          maxHeight: "400px",
          overflow: "auto"
        }}>
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px"
          }}>
            <ChatMessages messages={messages} />
            {isLoading && (
              <p style={{ 
                color: "#4a5568", 
                fontSize: "14px",
                textAlign: "center"
              }}>
                Thinking...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <ChatInput 
            onSendMessage={handleSendMessage}
            onFocus={() => setIsActive(true)}
            placeholder={isActive ? "Type your message..." : "Ask me anything..."}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;