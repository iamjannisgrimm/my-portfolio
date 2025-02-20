import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";
import ProfileHeader from "../components/ProfileHeader";
import Chatbot from "../components/chatbot/Chatbot.jsx";
import Footer from "../components/Footer";

export function Home() {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Profile Header with Fixed Height */}
      <div style={{ width: "100%", height: "700px", position: "relative" }}>
        <ProfileHeader image="/me/me.png" title="Engineer. Innovator. Leader." />
      </div>

      {/* Container for chat and contributions */}
      <div style={{ position: "relative" }}>
        {/* Chatbot Section */}
        <div style={{ 
          width: "100%",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{ 
            width: "100%", 
            maxWidth: "1200px", 
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px"
          }}>
            <Chatbot />
          </div>
        </div>

        {/* Contributions Section */}
        <div style={{ 
          width: "100%",
          position: "relative",
          zIndex: 1
        }}>
          <GitHubContributions username="iamjannisgrimm" />
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: "50px", width: "100%" }}>
        <Timeline items={timelineData} />
      </div>

      <Footer />
    </div>
  );
}