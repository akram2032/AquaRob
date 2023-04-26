import React from "react";
import "./pourcentageStyle.css";


const Percentage = ({ percent, width }) => {
  const strokeWidth = width;
  const radius = 40;
  const viewBoxSize = 90;
  const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percent) / 100;

  const handleValue = (percent)=>{
    if(percent === 0){
      return "PercentageCircle-text-gray"
    }else if(percent >= 50) {
      return "PercentageCircle-text-red"
    }else {
      return "PercentageCircle-text"
    }
  }
  return (
    <svg viewBox={viewBox} className="PercentageCircle">
      <circle
        className="PercentageCircle-trail"
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className={percent >= 50 ? "PercentageCircle-circle-red":"PercentageCircle-circle"}
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
      <text x="50%" y="50%" className={handleValue(percent)}>
        {percent === 0 ? "Loading..." : percent + "%"}
      </text>
    </svg>
  );
};

export default Percentage;
