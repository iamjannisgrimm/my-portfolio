import { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { getChatbotResponse } from "../../services/openaiservice.js";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnchored, setIsAnchored] = useState(false);
  const chatRef = useRef(null);
  const originalStyles = useRef(null);

  useEffect(() => {
    // Store the original position and styles when component mounts
    if (chatRef.current) {
      const element = chatRef.current;
      const styles = window.getComputedStyle(element);
      originalStyles.current = {
        position: styles.position,
        top: styles.top,
        left: styles.left,
        transform: styles.transform,
        width: styles.width,
        maxWidth: styles.maxWidth
      };
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {  // Add a small threshold
        setIsAnchored(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      // Scroll to bottom when anchoring
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={chatRef}
      style={{
        width: "100%",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...(isAnchored ? {
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        } : {
          position: "relative",
          transform: "none"
        }),
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform, position"
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
          opacity: 1,
          transform: isAnchored ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.3s ease-out"
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
      
      {/* Input bar */}
      <div 
        onClick={handleInputClick}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: isAnchored ? "12px 12px 0 0" : "8px",
          padding: "8px",
          boxShadow: isAnchored 
            ? "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" 
            : "0 2px 4px rgba(0, 0, 0, 0.1)",
          cursor: isAnchored ? "default" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chatbot;