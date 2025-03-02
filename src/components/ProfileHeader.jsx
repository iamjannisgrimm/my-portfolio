import React from "react";

const ProfileHeader = ({ image, title }) => {
  return (
    <div 
      style={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "700px",  
        width: "100vw",
        position: "relative",
        paddingBottom: "50px", 
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "black",
          fontSize: "48px",
          fontWeight: 800,
          textAlign: "center",
          whiteSpace: "nowrap",
          fontFamily: "'SF Pro', sans-serif" // ✅ Explicit SF Pro Heavy
        }}
      >
        {title}
      </h1>

      <img
        src={image}
        alt="Profile"
        style={{
          maxWidth: "400px",
          width: "100%",
          height: "auto",
          borderRadius: "12px",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

export default ProfileHeader;