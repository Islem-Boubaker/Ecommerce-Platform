import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
function subscribeform() {
  return (
      <div className='flex flex-row items-center m-10 justify-between rounded-2xl bg-black text-white h-40'>
          <div className='text-2xl ml-10 font-bold uppercase text-center'>
              stay updated about <br />our latest offers and promotions
          </div>
          <div className=" mr-10">
              <form className='flex flex-col items-center justify-center gap-4'>
                  <div className='flex flex-row items-center justify-center bg-white text-black rounded-2xl '>
                      <span className='text-gray-500 p-2 border-none'><AiOutlineMail /></span>
                      <input type="email" placeholder="Email" className='border-none focus:outline-none ring-0 w-80 rounded-2xl h-12' />
                  </div>
                  <button type="submit"className='bg-white text-black p-2 rounded-2xl w-90'>Subscribe to newsletter</button>
              </form>
          </div>
    </div>
  )
}

export default subscribeform

