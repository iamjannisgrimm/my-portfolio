import React, { useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"; // Minimalist Apple-like Icon
import TimelineItem from "./TimelineItem";
import timelineData from "../../data/timeline-data";

const Timeline = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [animatedData, setAnimatedData] = useState(timelineData);

  // Toggle sorting order with smooth transition
  const handleSortToggle = () => {
    setIsReversed((prev) => !prev);

    // Add a fade-out effect before reordering
    setAnimatedData((prevData) =>
      prevData.map((item) => ({ ...item, isFadingOut: true }))
    );

    setTimeout(() => {
      setAnimatedData((prevData) => {
        const reversedData = [...prevData].reverse();
        return reversedData.map((item) => ({
          ...item,
          isFadingOut: false,
          isFadingIn: true,
        }));
      });
    }, 250); // 250ms to sync with animation timing
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
            position: "relative", // Ensures stable positioning
          }}
        >
          {/* Title - Stays Centered */}
          <p
            style={{
              fontSize: "18px",
              color: textColor,
              fontFamily: "SF Pro",
              fontWeight: 500,
              margin: "0",
              textAlign: "center",
              flex: 1,
            }}
          >
            The projects and experiences that have inspired me over the years...
          </p>

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
              right: "50px", // Fixed position 50px from the right edge
              top: "50%", // Keeps it aligned with title
              transform: "translateY(-50%)", // Prevents shifting
              border: "none", // No borders
              outline: "none", // No focus outline
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.7")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            <ArrowsUpDownIcon
              style={{
                width: "24px",
                height: "24px",
                transition: "transform 0.3s ease",
                transform: isReversed ? "rotate(180deg)" : "rotate(0deg)", // Smooth rotation
              }}
            />
          </button>
        </div>
      </div>

      {/* Timeline Items with Smooth Animation */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        }}
      >
        {animatedData.map((item, index) => (
          <div
            key={index}
            style={{
              opacity: item.isFadingOut ? 0 : 1,
              transform: item.isFadingIn ? "scale(1.02)" : "scale(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <TimelineItem
              date={item.date}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              secondDescription={item.secondDescription}
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