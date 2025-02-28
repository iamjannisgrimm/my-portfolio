import React from "react";
import { FaRobot, FaLightbulb, FaQuestionCircle, FaComments } from "react-icons/fa"; // Example icons
import conversationPrompts from "../../data/prompts";

const iconMap = [FaRobot, FaLightbulb, FaQuestionCircle, FaComments];

const ConversationStarters = ({ onSelectPrompt }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr", // 2x2 grid layout
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        maxWidth: "600px", // Keeps it centered
        margin: "0 auto", // Ensures centering
      }}
    >
      {conversationPrompts.slice(0, 4).map((prompt, index) => {
        const Icon = iconMap[index % iconMap.length]; // Assigns an icon from the map
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPrompt(prompt);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "#333",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.3s ease-in-out",
              minWidth: "140px",
              height: "120px",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f5f5f5";
              e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Icon size={32} style={{ marginBottom: "10px", color: "#2563eb" }} />
            {prompt}
          </button>
        );
      })}
    </div>
  );
};

export default ConversationStarters;