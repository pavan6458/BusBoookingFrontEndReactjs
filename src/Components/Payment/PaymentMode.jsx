import React from 'react'

function PaymentMode(props) {
  return (
    <div className='border-1 border-gray-300 rounded-xl p-3'>
      <p className='font-bold'>Payment Options</p>
      <div className='flex align-middle justify-center my-[10%]'>
      <button className='w-[50%] h-[40px] rounded bg-blue-500 text-blue-100 font-bold hover:bg-blue-600 hover font-extrabold hover:text-white' onClick={()=>{props.addpayment()}}>Book Now</button>
      </div>
   

    </div>
  )
}

export default PaymentMode