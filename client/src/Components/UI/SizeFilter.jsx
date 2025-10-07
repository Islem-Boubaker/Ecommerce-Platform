import React from 'react'

export default function SizeFilter({ selectedSizes = [], onChange }) {
  const toggleSize = (size) => {
    const next = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    onChange && onChange(next)
  }

  return (
    <div className='flex flex-col gap-2 border-b-1 border-gray-400 pb-6'>
      <h3 className="font-semibold mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large", "3X-Large", "4X-Large"].map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => toggleSize(size)}
            className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
              selectedSizes.includes(size) ? 'bg-gray-200 border-black' : ''
            }`}
            aria-pressed={selectedSizes.includes(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}