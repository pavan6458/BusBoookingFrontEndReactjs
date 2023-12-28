import React from 'react'

function HomepageAdmin() {
  return (
    <div>
        <div>
        <div className='flex pt-10 pl-10 space-x-[50px]'>
                <div className='border-1 border-gray-400 rounded-lg shadow-lg w-[350px] py-7 grid justify-center text-center bg-gradient-to-r from-rose-400 to-red-500'>
                    <div className='font-bold text-white text-[20xp] uppercase'>Bookings</div>
                    <div className='text-white'>0</div>
                </div>
                <div className='border-1 border-gray-400 rounded-lg shadow-lg w-[350px] py-7 grid justify-center text-center bg-gradient-to-r from-indigo-500 to-blue-500'>
                    <div className='font-bold text-white text-[20xp] uppercase'>Schedule</div>
                    <div className='text-white'>0</div>
                </div>
            </div>
            <div className='flex pt-10 pl-10 space-x-[50px]'>
            <div className='border-1 border-gray-400 rounded-lg shadow-lg w-[350px] py-7 grid justify-center text-center bg-gradient-to-r from-slate-300 to-slate-500'>
                    <div className='font-bold text-white text-[20xp] uppercase'>Bus Operators</div>
                    <div className='text-white'>0</div>
                </div>
                <div className='border-1 border-gray-400 rounded-lg shadow-lg w-[350px] py-7 grid justify-center text-center bg-gradient-to-r from-teal-200 to-teal-500'>
                    <div className='font-bold text-white text-[20xp] uppercase'>Bookings Today</div>
                    <div className='text-white'>0</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomepageAdmin