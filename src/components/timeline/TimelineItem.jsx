import React from "react";

const TimelineItem = ({ date, title, subtitle, description, icon, image, techStack }) => {
  return (
    <div style={{ position: "relative", paddingBottom: "32px", display: "flex", gap: "16px" }}>
      {/* Timeline Dot */}
      <div style={{ position: "absolute", left: "-51px", top: "19px", width: "12px", height: "12px", backgroundColor: "gray", borderRadius: "50%" }}></div>

      {/* Left Column: Date + Icon (if available) */}
      <div style={{ width: "120px", textAlign: "right" }}>
        <p style={{ fontSize: "14px", color: "gray", marginBottom: "8px" }}>{date}</p>
        {icon && <img src={icon} alt="icon" style={{ width: "40px", height: "40px", objectFit: "contain" }} />}
      </div>

      {/* Right Column: Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "-20px", marginTop: "35px"}}>{title}</h3>
        <p style={{ fontSize: "16px", color: "gray", marginBottom: "8px" }}>{subtitle}</p>

        {/* Image (if provided) */}
        {image && (
          <div style={{ marginBottom: "12px" }}>
            <img src={image} alt="event" style={{ width: "100%", borderRadius: "8px", maxHeight: "200px", objectFit: "cover" }} />
          </div>
        )}

    <p style={{ color: "#333", marginBottom: "12px" }}>{description}</p>


        {/* Tech Stack Icons */}
        {techStack && techStack.length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {techStack.map((tech, index) => (
              <img key={index} src={tech} alt={tech} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;