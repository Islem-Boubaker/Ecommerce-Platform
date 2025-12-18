import React, { useRef, useEffect, useState, useCallback } from 'react';

export default function PriceFilter({ value = [50, 200], onChange }) {
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);
  const minPrice = 0;
  const maxPrice = 500;

  const handleMouseDown = (thumb) => {
    setIsDragging(thumb);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = Math.round(minPrice + percent * (maxPrice - minPrice));

    if (!onChange) return;
    if (isDragging === 'min') {
      onChange([Math.min(newValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue, value[0])]);
    }
  }, [isDragging, maxPrice, minPrice, onChange, value]);

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;

    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const newValue = Math.round(minPrice + percent * (maxPrice - minPrice));

    if (!onChange) return;
    if (isDragging === 'min') {
      onChange([Math.min(newValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue, value[0])]);
    }
  }, [isDragging, maxPrice, minPrice, onChange, value]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp); 
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, value, handleMouseMove, handleTouchMove]);

  const getPosition = (value) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border-b-1 border-gray-400 pb-6">
      <div className=" ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Price</h3>
         
        </div>

        {/* Slider Container */}
        <div className="relative pt-2 pb-8">
          {/* Track */}
          <div
            ref={sliderRef}
            className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          >
            {/* Active Range */}
            <div
              className="absolute h-2 bg-black rounded-full"
              style={{
                left: `${getPosition(value[0])}%`,
                right: `${100 - getPosition(value[1])}%`
              }}
            />

            {/* Min Thumb */}
            <div
              className="absolute w-6 h-6 bg-black rounded-full cursor-grab active:cursor-grabbing shadow-lg -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${getPosition(value[0])}%`,
                top: '50%'
              }}
              onMouseDown={() => handleMouseDown('min')}
              onTouchStart={() => handleMouseDown('min')}
            />

            {/* Max Thumb */}
            <div
              className="absolute w-6 h-6 bg-black rounded-full cursor-grab active:cursor-grabbing shadow-lg -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${getPosition(value[1])}%`,
                top: '50%'
              }}
              onMouseDown={() => handleMouseDown('max')}
              onTouchStart={() => handleMouseDown('max')}
            />
          </div>

          {/* Price Labels */}
          <div className="flex justify-between mt-4">
            <span className="text-sm font-medium">${value[0]}</span>
            <span className="text-sm font-medium">${value[1]}</span>
          </div>
        </div>
      </div>

     
    </div>
  );
}