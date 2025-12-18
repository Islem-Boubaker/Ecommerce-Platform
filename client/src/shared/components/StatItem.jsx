// StatItem.jsx
import React from "react";
import CountUp from "./Countup";

function StatItem({ from, to, duration, label, hasBorder }) {
  return (
    <div
      className={`w-20 flex flex-col items-center justify-center  ${hasBorder ? "border-l pl-8" : ""} border-gray-300 `}
    >
      <div className="text-base font-bold mb-2 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
        <CountUp from={from} to={to} duration={duration} />+
      </div>
      <p className="text-xs md:text-sm lg:text-base xl:text-lg">{label}</p>
    </div>
  );
}

export default StatItem;