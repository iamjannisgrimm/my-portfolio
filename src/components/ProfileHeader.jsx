import React from "react";

const ProfileHeader = ({ image, title }) => {
  return (
    <div style={{ position: "relative", textAlign: "center", marginBottom: "32px" }}>
      {/* Background Image */}
      <img
        src={image}
        alt="Profile"
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          borderRadius: "12px",
          display: "block",
          margin: "0 auto",
          objectFit: "cover"
        }}
      />

      {/* Overlay Text */}
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default ProfileHeader; // ✅ Fix: Now exporting as default