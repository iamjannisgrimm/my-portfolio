import React from "react";

const ProfileHeader = ({ image, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "80px 0", // Remove horizontal padding
        margin: 0,
        textAlign: "center"
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "black",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 800,
          textAlign: "center",
          whiteSpace: "normal",
          fontFamily: "SF Pro",
          letterSpacing: "-1px",
          padding: 0,
          margin: "0 0 30px 0", // Only bottom margin
          width: "100%",
          maxWidth: "800px"
        }}
      >
        {title}
      </h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: 0,
        padding: 0
      }}>
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt="Profile"
          style={{
            maxWidth: "400px",
            width: "90%",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover",
            display: "block",
            margin: 0
          }}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;