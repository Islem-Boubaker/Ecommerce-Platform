// StatItem.jsx
import React from "react";
import CountUp from "../Countup"; // Import your CountUp component

function StatItem({ from, to, duration, label, hasBorder }) {
  return (
    <div
      className={`text-left ${hasBorder ? "border-l pl-8" : ""} border-gray-300`}
    >
      <div className="text-4xl font-bold mb-2">
        <CountUp from={from} to={to} duration={duration} />+
      </div>
      <p className="text-base">{label}</p>
    </div>
  );
}

export default StatItem;
