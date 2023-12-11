import React from 'react'

function Header() {
  return (
    <div>
        <div className='px-10 py-2 flex w-full justify-between border border-b-zinc-300'>
            <p>logo</p>
            <div className='flex '>
                <div className='px-2 font-bold text-l cursor-pointer'>Register</div>
                <div className='px-2 font-bold cursor-pointer'>Login</div>
            </div>
          
        </div>
    </div>
  )
}

export default Header