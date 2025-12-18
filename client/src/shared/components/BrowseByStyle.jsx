import React from "react";
import Casual from "../../assets/Casual.png";
import Formal from "../../assets/Formal.png";
import Gym from "../../assets/Gym.png";
import Party from "../../assets/Party.png";

function BrowseByStyle() {
    const styles = [
        { id: 1, name: "Casual", image: Casual },
        { id: 2, name: "Formal", image: Formal },
        { id: 3, name: "Party", image: Party },
        { id: 4, name: "Gym", image: Gym },
    ];

    return (
        <div className="px-4 py-8 bg-gray-200 ml-20 mr-20 rounded-2xl shadow-lg">
            {/* Title */}
            <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-6">
                BROWSE BY DRESS STYLE
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-4 md:grid-cols-2 h-200">
                {styles.map((style, index) => (
                    <div
                        key={style.id}
                        className={`relative rounded-2xl overflow-hidden bg-white shadow-sm ${index === 0 ? "row-span-2 col-span-1" : ""} ${index === 1 ? "row-span-2 col-span-1" : ""}
                        ${index === 2 ? "row-span-2 col-span-1" : ""} ${index === 3 ? "row-span-2 col-span-1" : ""}`}
                    >
                        {/* Image */}
                        <img
                            src={style.image}
                            alt={style.name}
                            className="w-full h-100"
                        />
                        {/* Text Overlay */}
                        <h3 className="absolute top-3 left-3 text-lg font-semibold text-black">
                            {style.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrowseByStyle;