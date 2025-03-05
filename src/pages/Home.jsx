import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";
import ProfileHeader from "../components/ProfileHeader";
import Chatbot from "../components/chatbot/Chatbot.jsx";
import Footer from "../components/Footer";

export function Home() {
  return (
    <div style={{ 
      width: "100%", 
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 0,
      padding: 0
    }}>
      {/* All blurrable content */}
      <div className="blurrable-content" style={{ 
        width: "100%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0
      }}>
        {/* Profile Header Section */}
        <div className="center-container" style={{ width: "100%" }}>
          <div className="content-container">
            <ProfileHeader image="me/me.png" title="Engineer. Innovator. Leader" />
          </div>
        </div>
        
        {/* GitHub Contributions Section */}
        <div className="center-container" style={{ width: "100%", backgroundColor: "white" }}>
          <div className="content-container">
            <GitHubContributions username="iamjannisgrimm" />
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="center-container" style={{ width: "100%" }}>
          <div className="content-container">
            <Timeline items={timelineData} />
          </div>
        </div>
        
        {/* Footer Section */}
        <div className="center-container" style={{ width: "100%" }}>
          <div className="content-container">
            <Footer />
          </div>
        </div>
      </div>
      
      {/* Chatbot positioned absolutely over other content */}
      <div style={{
        position: "absolute",
        top: "650px",
        left: 0,
        right: 0,
        zIndex: 1000,
        pointerEvents: "all",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: 0,
        padding: 0
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "center",
          margin: 0,
          padding: 0
        }}>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}