import React, { useState, useEffect } from 'react';
import Aboutimg from "../assets/Aboutimg.png"
import StatItem from '../Components/UI/statItem';




function CountUp({ from, to, duration }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const increment = (to - from) / (duration * 60); // 60fps
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= to) {
          clearInterval(timer);
          return to;
        }
        return Math.min(prev + increment, to);
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{Math.floor(count).toLocaleString()}</span>;
}

function About() {
  const stats = [
    { from: 0, to: 200, duration: 2, label: "International Brands" },
    { from: 0, to: 2000, duration: 2, label: "High-Quality Products" },
    { from: 0, to: 30000, duration: 2, label: "Happy Customers" },
  ];

  return (
    <div className=" flex  flex-col items-center  overflow-hidden sm:flex-row sm:overflow-none sm:relative
      ">

      {/* Text Content */}
      <div className="flex-1/3 max-w-3xl p-8 text-center mx-auto md:text-left md:mx-0 md:ml-8 md:z-10 md:text-2xl">
        <h1 className="text-5xl xl:text-7xl font-black text-black leading-tight mb-8">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="text-xl text-gray-600 max-w-lg leading-relaxed mb-8 mx-auto md:mx-0">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>
        <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg mb-12">
          Shop Now
        </button>
        <div className="pt-8 border-t border-gray-300 md:max-w-2xl md:mx-auto">
          {/* First row with 2 items */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 text-center">
            <StatItem className="text-center "
              from={stats[0].from}
              to={stats[0].to}
              duration={stats[0].duration}
              label={stats[0].label}
              hasBorder={false}
            />
            <StatItem className="text-center"
              from={stats[1].from}
              to={stats[1].to}
              duration={stats[1].duration}
              label={stats[1].label}
              hasBorder={true}
            />
          </div>
          {/* Second row with centered item */}
          <div className="flex justify-center">
            <StatItem className="text-center"
              from={stats[2].from}
              to={stats[2].to}
              duration={stats[2].duration}
              label={stats[2].label}
              hasBorder={false}
            />
          </div>
        </div>
      </div>
      {/* Background image */}
      <div className="  bg-gray-100
            ">
        <img
          src={Aboutimg}
          alt="Fashion Models"
          className="w-[700px] h-[400px]  relative right-10 sm:object-cover md:w-full md:h-full md:absolute  top-0 md:left-2 md:z-0"
        />
      </div>
    </div>
  );
}
export default About