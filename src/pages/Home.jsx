import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";
import ProfileHeader from "../components/ProfileHeader";

export function Home() {
  return (
    <div>
      <ProfileHeader
        image="/me/me.png" // Replace with actual image path
        title="Engineer. Innovator. Leader."
      />
      <GitHubContributions username="iamjannisgrimm" /> {/* Replace with your GitHub username */}
      <Timeline items={timelineData} />
    </div>
  );
}