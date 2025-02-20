import { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { getChatbotResponse } from "../../services/openaiservice.js";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnchored, setIsAnchored] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsAnchored(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const blurrableContent = document.querySelector('.blurrable-content');
    if (blurrableContent) {
      if (isAnchored) {
        blurrableContent.style.transition = 'filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        blurrableContent.style.filter = 'blur(5px)';
      } else {
        blurrableContent.style.transition = 'filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        blurrableContent.style.filter = 'none';
      }
    }
  }, [isAnchored]);

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

  const handleInputClick = () => {
    if (!isAnchored) {
      setIsAnchored(true);
    }
  };

  const getTransform = () => {
    if (!isAnchored) return "none";
    const rect = chatRef.current?.getBoundingClientRect();
    if (!rect) return "none";
    
    const inputBarHeight = 56;
    const distanceToBottom = window.innerHeight - rect.top - inputBarHeight;
    
    return `translateY(${distanceToBottom}px)`;
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    }}>
      <div 
        ref={chatRef}
        className="chat-overlay"
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          transform: getTransform(),
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
          zIndex: isAnchored ? 1000 : 1
        }}
      >
        {/* Messages appear above the input */}
        {messages.length > 0 && (
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            opacity: isAnchored ? 1 : 0,
            transform: isAnchored ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            maxHeight: isAnchored ? "calc(100vh - 100px)" : "none",
            overflowY: "auto"
          }}>
            <ChatMessages messages={messages} />
            {isLoading && (
              <p style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center"
              }}>
                Thinking...
              </p>
            )}
          </div>
        )}
        
        {/* Input bar wrapper for full-width background */}
        <div 
          onClick={handleInputClick}
          style={{
            position: "relative",
            margin: "0 -50vw",
            padding: "8px 50vw",
            backgroundColor: "#ffffff",
            boxShadow: isAnchored ? "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            cursor: isAnchored ? "default" : "pointer",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
          }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;