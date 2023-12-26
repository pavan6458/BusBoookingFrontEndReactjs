import React from 'react'
import { FaRegUser } from "react-icons/fa6";

function MyProfileImage() {

    
    
  return (
    <div className='bg-white px-4 shadow py-10 rounded-lg'>
        <div className='bg-gradient-to-r from-indigo-500 to-blue-500 p-16 rounded border-4 border-gray-50'>
        <FaRegUser className='z-[1] text-white text-5xl' />
        </div>
        <p className='text-center pt-2'>PERSONAL PROFILE</p>
        <div className='flex justify-center mt-2 bg-gray-300 py-1 rounded text-white font-extrabold'>  <FaRegUser className='mr-2 mt-[2px] '/> <p>Profile</p></div>
        <div className='flex justify-center mt-2 bg-gray-300 py-1 rounded text-white font-extrabold'>  <FaRegUser className='mr-2 mt-[2px] '/> <p>Logout</p></div>
    </div>
  )
}

export default MyProfileImage