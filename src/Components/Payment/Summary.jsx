import React from 'react'
import { useLocation } from 'react-router-dom'

function Summary() {
  const data = useLocation().state;
  return (
    <div className='border-1 border-gray-300 rounded-xl '>
      <p className='text-sm font-bold p-2'>Fare Summary</p>
      <div className='border-b border-gray-300 w-full'></div>

     

    </div>
  )
}

export default Summary