import React, { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubContributions = ({ username }) => {
  const [containerWidth, setContainerWidth] = useState(Math.min(window.innerWidth * 0.9, 800));

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(Math.min(window.innerWidth * 0.9, 800));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center", 
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        padding: "70px 8vw", // ✅ Increased padding for a larger default size
        boxSizing: "border-box",
      }}
    >
      <div 
        style={{ 
          width: `min(${containerWidth}px, 100%)`,
          maxWidth: "100%",
          transition: "width 0.3s ease-in-out",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GitHubCalendar
          username={username}
          blockSize={Math.max(containerWidth / 90, 7)}
          blockMargin={Math.max(containerWidth / 250, 2)}
          fontSize={Math.max(containerWidth / 140, 8)}
          colorScheme="dark"
        />
      </div>
    </div>
  );
};

export default GitHubContributions;