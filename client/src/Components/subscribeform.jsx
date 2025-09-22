import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
function subscribeform() {
  return (
      <div className='flex flex-col h-fit p-8 items-center m-10 justify-between rounded-2xl  bg-black text-white  lg:flex-row '>
          <div className='text-2xl font-bold uppercase text-center'>
              stay updated about <br />our latest offers and promotions
          </div>
          
              <form className='flex flex-col items-center justify-center gap-4'>
                  <div className='flex flex-row items-center justify-center bg-white text-black rounded-2xl '>
                      <span className='text-gray-500 p-2 border-none'><AiOutlineMail /></span>
                      <input type="email" placeholder="Email" className='border-none focus:outline-none ring-0 w-50 rounded-2xl h-12 lg:w-88' />
                  </div>
                  <button type="submit"className='bg-white text-black p-2 rounded-2xl w-60 lg:w-96'>Subscribe to newsletter</button>
              </form>
          
    </div>
  
)
}

export default subscribeform

