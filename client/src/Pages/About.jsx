import React, { useState, useEffect } from 'react';


// CountUp component
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
    return (
        <div className="min-h-[calc(100vh-8rem)]  ">
            {/* Left Section  */}
            <div className=" relative z-10 min-h-[calc(100vh-8rem)]">
                <div className="container mx-auto px-4 py-8 relative">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                        {/* Left Content */}
                        <div className="space-y-8 relative z-10">
                         

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight">
                                FIND CLOTHES
                                <br />
                                THAT MATCHES
                                <br />
                                YOUR STYLE
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                                Browse through our diverse range of meticulously crafted garments,
                                designed to bring out your individuality and cater to your sense of style.
                            </p>

                            {/* CTA Button */}
                            <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Shop Now
                            </button>

                            {/* Stats Section */}
                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        <CountUp from={0} to={200} duration={2} />+
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base">International Brands</p>
                                </div>

                                <div className="text-center border-l border-r border-gray-200">
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        <CountUp from={0} to={2000} duration={2} />+
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base">High-Quality Products</p>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        <CountUp from={0} to={30000} duration={2} />+
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base">Happy Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Section image */}
            <div className=" right-0">
                <img
                    src="/Aboutimg.png"
                    alt="Fashion Models"
                    className="w-full h-full object-cover z-0 absolute  min-h-[calc(100vh-8rem)] top-20 right-0 bottom-0 left-0 "
                />
            </div>

        </div>
    );
}

export default About;
