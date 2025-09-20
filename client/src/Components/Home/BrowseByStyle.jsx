import React from "react";
import Casual from "../../assets/Casual.png";
import Formal from "../../assets/Formal.png";
import Gym from "../../assets/Gym.png";
import Party from "../../assets/Party.png";


function BrowseByStyle() {
    const styles = [
        { id: 1, name: "Casual", image: Casual },
        { id: 2, name: "Formal", image: Formal },
        { id: 3, name: "Gym", image: Gym },
        { id: 4, name: "Party", image: Party },
    ];
    return (
        <div>
            <h2>Browse By Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl bg-gray-200 ">
                {styles.map((style) => (
                    <div key={style.id} className="flex flex-col items-center justify-center w-50 h-50">
                        <h3>{style.name}</h3>
                        <img src={style.image} alt={style.name} className="w-50 h-50" />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BrowseByStyle;