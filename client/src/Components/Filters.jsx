import React from 'react'

import PriceFilter from './UI/PriceFilter';
import ColorFilter from './UI/ColorFilter';
import SizeFilter from './UI/SizeFilter';
import DressStyleFilter from './UI/DressStyleFilter';
export default function Filters() {



  return (

    <aside className=" border p-6 space-y-6 w-full min-h-screen rounded-3xl">
      <div>
        <h2 className="font-semibold mb-2">Filter by</h2>
      </div>
      <form className='h-full flex flex-col justify-between gap-6'>
        {/* Price Filter */}

        <PriceFilter />
        {/* Color Filter */}
        <ColorFilter />

        {/* Sizes */}
        <SizeFilter />

        {/* Dress Style Filter */}
        <DressStyleFilter />
        {/* Apply Button */}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-xl">Apply Filter</button>
      </form>

    </aside>


  )
}
