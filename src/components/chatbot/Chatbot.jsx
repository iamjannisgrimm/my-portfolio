import { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { getChatbotResponse } from "../../services/openaiservice.js";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnchored, setIsAnchored] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      blurrableContent.style.transition = `filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)`;
      blurrableContent.style.filter = isAnchored ? 'blur(50px)' : 'blur(0px)';
    }

    let overlay = document.getElementById('click-exit-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'click-exit-overlay';
      document.body.appendChild(overlay);
    }

    const handleOverlayClick = () => setIsAnchored(false);

    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'transparent',
      transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isAnchored ? '1' : '0',
      pointerEvents: isAnchored ? 'auto' : 'none',
      zIndex: '900',
      cursor: 'pointer'
    });

    overlay.addEventListener('click', handleOverlayClick);
    return () => {
      overlay.removeEventListener('click', handleOverlayClick);
      if (!isAnchored) overlay.remove();
    };
  }, [isAnchored]);

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    const userMessage = { text: message, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const botResponseText = await getChatbotResponse(message);
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages(prev => [...prev, { text: "Error fetching response.", sender: "bot" }]);
    }
    setIsLoading(false);
  };

  const handleInputClick = () => {
    if (!isAnchored) setIsAnchored(true);
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
          position: isAnchored ? "fixed" : "relative",
          bottom: isAnchored ? "0" : "auto",
          left: isAnchored ? "50%" : "auto",
          transform: isAnchored ? "translateX(-50%)" : "none",
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, position",
          zIndex: isAnchored ? 1000 : 1
        }}
      >
        {/* Messages container */}
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          pointerEvents: messages.length > 0 ? "auto" : "none",
          marginBottom: "20px"
        }}>
          {(messages.length > 0 || isLoading) && (
            <div style={{
              background: "transparent",
              width: "100%",
              maxHeight: "calc(70vh - 100px)",
              overflowY: "auto",
              opacity: isAnchored ? 1 : 0,
              transform: isAnchored ? "translateY(0)" : "translateY(20px)",
              transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>
              <ChatMessages messages={messages} />
              {isLoading && (
                <p style={{
                  color: "#4a5568",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "center",
                  background: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-block",
                  margin: "0 auto"
                }}>
                  Thinking...
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Input bar wrapper */}
        <div 
          onClick={handleInputClick}
          style={{
            position: "relative",
            margin: "0 -50vw",
            padding: isAnchored && !isMobile ? "24px 50vw" : "8px 50vw",
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