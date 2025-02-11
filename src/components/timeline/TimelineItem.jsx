import React from "react";

const TimelineItem = ({ date, title, subtitle, description, icon, image, techStack, background }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "20px",
        backgroundColor: background || "white",
        borderRadius: "8px",
        padding: "100px 30px", // ✅ Keeps 30px padding around
        width: "100vw",
        maxWidth: "100vw",
        boxSizing: "border-box",
        paddingLeft: "60px",
        alignItems: "flex-start",
      }}
    >
      {/* Left Column: Date & Icon (Stacked) */}
      <div
        style={{
          width: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "50px",
          flexShrink: 0, // ✅ Prevents early shrinking
        }}
      >
        <p style={{ fontSize: "18px", color: "gray", marginBottom: "8px" }}>{date}</p>
        {icon && <img src={icon} alt="icon" style={{ width: "60px", height: "60px", objectFit: "contain" }} />}
      </div>

      {/* Right Column: Main Content */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-start",
        minWidth: "calc(100% - 150px)", 
        padding: "0px", // ✅ Ensures 30px padding around text
        marginLeft: "-25px",
      }}>
        <h3 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "-25px", marginTop: "48px" }}>{title}</h3>
        <p style={{ fontSize: "20px", color: "gray", marginBottom: "24px" }}>{subtitle}</p>

        {/* Image (Scales Down Later with Better Control) */}
        {image && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingRight: "30px", // ✅ Ensures padding remains
              marginLeft: "-72px"
            }}
          >
            <img
              src={image}
              alt="event"
              style={{
                width: "100%",
                maxWidth: "min(650px, 70vw)", // ✅ Keeps image larger for longer
                minWidth: "400px", // ✅ Ensures it doesn't shrink too soon
                height: "auto",
                objectFit: "contain",
                borderRadius: "0px",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </div>
        )}

        {/* Description (Scales Down Later) */}
        <p
          style={{
            color: "gray",
            textAlign: "left",
            maxWidth: "clamp(300px, 95%, 100% - 50px)", // ✅ Allows later scaling
            padding: "10px 0",
            minWidth: "320px", // ✅ Ensures text stays readable longer
            marginLeft: "-72px"
          }}
        >
          {description}
        </p>
      </div>

      {/* Timeline Line - Stays full height */}
      <div
        style={{
          position: "absolute",
          left: "60px",
          top: "0px",
          width: "4px",
          height: "100%",
          backgroundColor: "gray",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default TimelineItem;