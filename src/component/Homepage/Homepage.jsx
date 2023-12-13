import React from 'react'
import Header from '../Header/Header'
import BusSearch from '../BusSearch/BusSearch'

function Homepage() {
  return (
    <div>
        <Header />
        <img src={require("../../assests/images/bg.png")} className='absolute z-[-1]'/>
        <div className='text-5xl	mt-10 font-bold text-center'>Bus Ticket Booking</div>
        <p className='text-center mt-3'>Book better bus from local hosts</p>
        <BusSearch/>
    </div>
  )
}

export default Homepage