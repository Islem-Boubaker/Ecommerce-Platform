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
        <div className="relative min-h-screen flex items-center 
        max-lg:
        max-md:block 
        max-sm:block
      ">
        {/* Background image */}
            <div className="absolute inset-0 z-0
            max-lg:
            max-md: 
            max-sm: 
            ">
          <img
            src={Aboutimg}
            alt="Fashion Models"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Text Content */}
            <div className="relative z-10 max-w-3xl p-8
            max-lg:
            max-md:z-0
            max-sm:z-0
        ">
          <h1 className="text-5xl xl:text-7xl font-black text-black leading-tight mb-8">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg mb-12">
            Shop Now
          </button>
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-300 w-1/1">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                from={stat.from}
                to={stat.to}
                duration={stat.duration}
                label={stat.label}
                hasBorder={index !== 0}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  export default About