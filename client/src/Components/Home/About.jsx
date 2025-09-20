import React, { useState, useEffect } from 'react';
import Aboutimg from "../../assets/Aboutimg.png"
import StatItem from '../UI/statItem';




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
    <div className="w-fit flex flex-col  sm:h-230  xl:flex-row md:h-230 md:relative  lg:h-150 md:w-auto">

      {/* Text Content */}
      <div className="text-center mx-auto md:absolute md:z-10 md:text-2xl md:w-[600px] xl:w-[800px] pl-10">
        <h1 className="text-2xl font-black text-black leading-tight mb-8 md:text-5xl">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="text-xl text-gray-600 max-w-lg leading-relaxed mb-8 mx-auto md:mx-0 md:text-xl">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>
        <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg mb-12">
          Shop Now
        </button>
        <div className="pt-8 ">
          <div className="grid grid-cols-2 mb-6 gap-4 lg:grid-cols-3 lg:gap-8  lg:mb-8 ">
            {stats.map((stat, index) => (
              <div key={index} className={index === 2 ? "col-start-1 col-end-3 flex justify-center md:col-start-auto md:col-end-auto lg:border-l lg:pl-8 lg:border-gray-300" : ""}>
                <StatItem
                  from={stat.from}
                  to={stat.to}
                  duration={stat.duration}
                  label={stat.label}
                  hasBorder={index === 1}
                />
              </div>
            ))}
          </div>

        </div>
      </div>



      {/* Background image */}
        <div className="bg-gray-100 md:w-1000">
          <img  
            src={Aboutimg}
            alt="Fashion Models"
            className="w-700 h-100 relative right-10 sm:object-cover sm:top-2  md:absolute  lg:left-0 md:z-0 lg:h-150 md: md:w-300 md:h-200 lg:w-full lg:max-h-300 lg:max-w-600 "
          />

        </div>






    </div>
  );
}
export default About