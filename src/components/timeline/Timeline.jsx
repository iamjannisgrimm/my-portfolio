import React from "react";
import TimelineItem from "./TimelineItem";
import timelineData from "../../data/timeline-data";

const Timeline = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw" }}>
      {timelineData.map((item, index) => (
         <TimelineItem
         key={index}
         date={item.date}
         title={item.title}
         subtitle={item.subtitle}
         description={item.description}
         icon={item.icon}
         image={item.image}
         techStack={item.techStack}
         background={item.background}
         topSpacing={item.topSpacing}
         bottomSpacing={item.bottomSpacing}
         link={item.link}  // Added this
         linkColor={item.linkColor}
       />
     ))}
   </div>
  );
};

export default Timeline;