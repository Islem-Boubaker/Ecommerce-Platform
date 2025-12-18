import React from 'react'

export default function DressStyleFilter({selectedStyle,setSelectedStyle}) {
    return (
        <div>
            <h3 className="font-semibold mb-2">Dress Style</h3>
            <div className="flex flex-wrap gap-2">
                <ul className="flex flex-col gap-2 w-full">
                    {[
                        "Casual",
                        "Formal",
                        "Party",
                        "Gym"
                    ].map((style) => (

                        <li
                            key={style}
                            className={`px-3 py-1 text-sm  hover:bg-gray-200 cursor-pointer w-full ${selectedStyle === style ? "bg-gray-200" : ""}`}
                            onClick={() => setSelectedStyle(style)}
                        >
                            {style}
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    )
}
