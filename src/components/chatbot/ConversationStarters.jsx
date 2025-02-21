import React from "react";
import conversationPrompts from "../../data/prompts";

const ConversationStarters = ({ onSelectPrompt }) => {
  return (
    <div
      // Stop the click from reaching the overlay
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        flexDirection: "column", // stack vertically
        alignItems: "center",    // center horizontally
        padding: "10px 0",
        gap: "10px",             // space between buttons
      }}
    >
      {conversationPrompts.map((prompt, index) => (
        <button
          key={index}
          // Also stopPropagation here just in case
          onClick={(e) => {
            e.stopPropagation();
            onSelectPrompt(prompt); // triggers the conversation
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#f3f4f6",
            color: "#111827",
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