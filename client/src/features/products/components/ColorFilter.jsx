import React from 'react'

export default function ColorFilter({ selectedColors = [], onChange }) {
  const toggleColor = (color) => {
    const next = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    onChange && onChange(next)
  }

  return (
    <div className='flex flex-col gap-2 border-b-1  border-gray-400 pb-6'>
      <h3 className="font-semibold mb-2">Colors</h3>
      <div className="grid grid-cols-5 gap-2">
        {["green","red" , "yellow","orange","deepskyblue","blue","purple","pink","white","black"].map(
          (color) => (
            <button
              type="button"
              key={color}
              onClick={() => toggleColor(color)}
              className={`h-10 w-10 rounded-full border-2  ${
                selectedColors.includes(color)
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              aria-pressed={selectedColors.includes(color)}
            />
          )
        )}
      </div>
    </div>
  )
}
