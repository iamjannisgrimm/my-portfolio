import React from "react";
import Timeline from "../components/timeline/Timeline";
import timelineData from "../data/timeline-data";
import GitHubContributions from "../components/GitHubContributions";

export function Home() {
  return (
    <div>
      <h1>My Journey</h1>
      <GitHubContributions username="iamjannisgrimm" /> {/* Replace with your GitHub username */}
      <Timeline items={timelineData} />
    </div>
  );
}