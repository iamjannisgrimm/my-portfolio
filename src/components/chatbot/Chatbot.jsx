import { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import ConversationStarters from "./ConversationStarters.jsx";
import { getChatbotResponse } from "../../services/openaiservice.js";
import { userContext } from "../../data/prompts";


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnchored, setIsAnchored] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const chatRef = useRef(null);
  const [initialPosition, setInitialPosition] = useState(null);

  // Update screen width on resize and store initial position
  useEffect(() => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      setInitialPosition({ top: rect.top, left: rect.left });
    }
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide anchored state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsAnchored(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Blur background when anchored
  useEffect(() => {
    const blurrableContent = document.querySelector(".blurrable-content");
    if (blurrableContent) {
      blurrableContent.style.transition =
        "filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
      blurrableContent.style.filter = isAnchored ? "blur(50px)" : "blur(0px)";
    }
    let overlay = document.getElementById("click-exit-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "click-exit-overlay";
      document.body.appendChild(overlay);
    }
    const handleOverlayClick = () => setIsAnchored(false);
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "transparent",
      transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: isAnchored ? "1" : "0",
      pointerEvents: isAnchored ? "auto" : "none",
      zIndex: "900",
      cursor: "pointer",
    });
    overlay.addEventListener("click", handleOverlayClick);
    return () => {
      overlay.removeEventListener("click", handleOverlayClick);
      if (!isAnchored) overlay.remove();
    };
  }, [isAnchored]);

  // When a conversation prompt is selected, send it as a regular user message.
  const handlePromptSelect = (prompt) => {
    handleSendMessage(prompt);
  };

  // Send a message that includes your user context
  const handleSendMessage = async (message) => {
    setIsLoading(true);
    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    try {
      // Prepend the user context to the user's message
      const fullMessage = `${userContext}\nUser: ${message}`;
      const botResponseText = await getChatbotResponse(fullMessage);
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response.", sender: "bot" },
      ]);
    }
    setIsLoading(false);
  };

  const handleInputClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
    setTimeout(() => setIsAnchored(true), 300); // Delay anchoring slightly to allow scrolling
  };
  
  // Only adjust vertical translation when anchored.
  const getTransform = () => {
    if (!isAnchored || !initialPosition) return "none";
    const currentTop = initialPosition.top;
    const desiredBottom = window.innerHeight - 104;
    const moveY = desiredBottom - currentTop;
    return `translate(0px, ${moveY}px)`;
  };

  // Dynamic width: 90% of viewport width capped at 500px.
  const inputBarWidth = Math.min(screenWidth * 0.9, 500);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
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
          transform: getTransform(),
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
          zIndex: isAnchored ? 1000 : 1,
        }}
      >
        {/* Render messages (or conversation starters) only when anchored */}
        {isAnchored && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "0",
              right: "0",
              // Use flex to push messages to the bottom of the view
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              pointerEvents: "auto",
              marginBottom: "20px",
            }}
          >
            {messages.length === 0 ? (
              <ConversationStarters onSelectPrompt={handlePromptSelect} />
            ) : (
              <ChatMessages messages={messages} isLoading={isLoading} />
            )}
          </div>
        )}

        {/* Input bar wrapper – always centered with a slight x offset */}
        <div
          onClick={handleInputClick}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateX(-10px)",
            backgroundColor: "transparent",
            cursor: isAnchored ? "default" : "pointer",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ width: `${inputBarWidth}px`, margin: "0 auto" }}>
            <ChatInput
              onSendMessage={handleSendMessage}
              isAnchored={isAnchored}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;