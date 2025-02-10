import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubContributions = ({ username }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>GitHub Contributions</h2>
      <GitHubCalendar
        username={username}
        blockSize={12} // Adjusts square size
        blockMargin={4} // Spacing between squares
        fontSize={14} // Adjusts font size
        colorScheme="dark" // Light or dark theme
      />
    </div>
  );
};

export default GitHubContributions;