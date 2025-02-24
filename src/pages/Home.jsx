import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";
import ProfileHeader from "../components/ProfileHeader";
import Chatbot from "../components/chatbot/Chatbot.jsx";
import Footer from "../components/Footer";
import FigmaEmbed from "../components/FigmaEmbed";

export function Home() {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* All blurrable content */}
      <div className="blurrable-content" style={{ position: "relative" }}>
        {/* Profile Header */}
        <div style={{ width: "100%", height: "700px", position: "relative" }}>
          <ProfileHeader image="/me/me.png" title="Engineer. Innovator. Leader." />
        </div>

        {/* Contributions Section */}
        <div style={{ width: "100%", position: "relative" }}>
          <GitHubContributions username="iamjannisgrimm" />
        </div>

        {/* Figma Board Fullscreen Embed
  <div style={{ width: "100%", height: "100vh", marginTop: "20px" }}>
    <FigmaEmbed />
  </div> */}


        {/* Timeline */}
        <div style={{ marginTop: "20px", width: "100%" }}>
          <Timeline items={timelineData} />
        </div>

        <Footer />
      </div>

      {/* Chatbot positioned absolutely over other content */}
      <div style={{
        position: "absolute",
        top: "640px", // Adjust this value to position the chatbot where you want it
        left: "0",
        right: "0",
        zIndex: 1000,
        pointerEvents: "all"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "center"
        }}>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}