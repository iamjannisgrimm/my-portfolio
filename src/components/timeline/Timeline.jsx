import React, { useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"; // Minimalist Apple-like Icon
import TimelineItem from "./TimelineItem";
import timelineData from "../../data/timeline-data";

const Timeline = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [animatedData, setAnimatedData] = useState(timelineData);

  // Toggle sorting order with animation
  const handleSortToggle = () => {
    setIsReversed((prev) => !prev);

    // Add fade-out effect before sorting
    setAnimatedData((prevData) => prevData.map((item) => ({ ...item, fadeOut: true })));

    setTimeout(() => {
      setAnimatedData((prevData) => {
        const reversedData = [...prevData].reverse();
        return reversedData.map((item) => ({ ...item, fadeOut: false, fadeIn: true }));
      });
    }, 300);
  };

  // Dynamic styling based on sorting order
  const isOldestFirst = !isReversed;
  const backgroundColor = isOldestFirst ? "#2A2A2A" : "#ffffff";
  const textColor = isOldestFirst ? "#ffffff" : "#000000";

  return (
    <div style={{ width: "100vw", position: "relative" }}>
      {/* Timeline Header Section */}
      <div
        style={{
          width: "100vw",
          position: "relative",
          backgroundColor: backgroundColor,
          color: textColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0",
          margin: "0",
          transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
      >
        {/* Title & Sort Button Row */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Title stays centered
            padding: "35px 30px",
            position: "relative", // Keeps title centered
          }}
        >
          {/* Title - Stays Centered */}
          <p style={{ 
            fontSize: "18px",  
            fontWeight: "600",
            color: textColor, 
            fontFamily: "SF Pro",
            margin: "0",
            textAlign: "center",
            flex: 1,
          }}>
            Take a look at the projects and experiences that have inspired me over the years...
          </p>
        </div>

        {/* Sort Button - Absolutely Positioned to the Right of the Screen */}
        <button
          onClick={handleSortToggle}
          style={{
            padding: "0",
            backgroundColor: "transparent",
            color: textColor,
            cursor: "pointer",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: "50px", // 50px from the right edge of the screen
            top: "50%", // Vertically align with the title
            transform: isReversed ? "rotate(180deg) translateY(-50%)" : "translateY(-50%)", // Keeps rotation & alignment smooth
            border: "none", // No borders
            outline: "none", // No focus outline
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          <ArrowsUpDownIcon style={{ width: "24px", height: "24px" }} />
        </button>
      </div>

      {/* Timeline Items with Animation */}
      <div style={{ 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        transition: "all 0.5s ease-in-out" 
      }}>
        {animatedData.map((item, index) => (
          <div
            key={index}
            style={{
              opacity: item.fadeOut ? 0 : 1,
              transform: item.fadeIn ? "scale(1.05)" : "scale(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease"
            }}
          >
            <TimelineItem
              date={item.date}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              icon={item.icon}
              image={item.image}
              techStack={item.techStack}
              background={item.background}
              topSpacing={item.topSpacing}
              bottomSpacing={item.bottomSpacing}
              link={item.link}
              linkColor={item.linkColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;