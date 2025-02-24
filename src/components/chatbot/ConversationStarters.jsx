import React from "react";
import conversationPrompts from "../../data/prompts";

const ConversationStarters = ({ onSelectPrompt }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 0 30px 0", // extra bottom padding for spacing
        gap: "30px",
      }}
    >
      {conversationPrompts.map((prompt, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPrompt(prompt);
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#85A7D5",
            color: "#ffffff",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default ConversationStarters;