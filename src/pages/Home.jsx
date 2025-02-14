import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";
import ProfileHeader from "../components/ProfileHeader";
import Footer from "../components/Footer";  // Add this import

export function Home() {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Profile Header with Fixed Height */}
      <div style={{ width: "100%", height: "700px", position: "relative" }}>
        <ProfileHeader image="/me/me.png" title="Engineer. Innovator. Leader." />
      </div>
      {/* Locked Contribution Section Below */}
      <div style={{ width: "100%", position: "relative", marginTop: "-150px" }}>
        <GitHubContributions username="iamjannisgrimm" />
      </div>
      {/* Timeline Always Below Contributions */}
      <div style={{ marginTop: "0px", width: "100%" }}>
        <Timeline items={timelineData} />
      </div>
      <Footer />  {/* Add the Footer component here */}
    </div>
  );
}