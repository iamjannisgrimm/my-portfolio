import React from "react";
import TimelineItem from "./TimelineItem";
import timelineData from "../../data/timeline-data";

const Timeline = () => {
  return (
    <div style={{ padding: "32px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "600px", display: "flex" }}>
        {/* Left Column: Timeline Line */}
        <div style={{ width: "50px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Timeline Line */}
          <div style={{ width: "4px", backgroundColor: "gray", position: "absolute", top: "0", bottom: "0", left: "50%", transform: "translateX(-50%)" }}></div>
        </div>

        {/* Right Column: Timeline Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingLeft: "20px", flex: "1" }}>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              date={item.date}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              icon={item.icon}
              image={item.image}
              techStack={item.techStack}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;