import React from 'react'

export default function SizeFilter() {
    return (

        <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
                {["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large", "3X-Large", "4X-Large"].map((size) => (
                    <button
                        key={size}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>

    )
}