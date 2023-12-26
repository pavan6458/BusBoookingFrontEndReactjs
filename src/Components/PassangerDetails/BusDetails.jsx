import React from 'react'
import { useLocation } from 'react-router-dom';

function BusDetails(props) {
    const data = useLocation().state.updatedItem;
    console.log("data",data)
  return (
    <div className='w-full'>
        <div className="w-full   border-1 rounded-lg py-2 border-gray-300">
        <div className="flex justify-between w-[100%]">
          <div className="px-3">
            <p className="text-[14px] font-extrabold capitalize">
              {data.bus.busName}
            </p>
            <div className="text-[14px] uppercase text-gray-600 mb-2">
              VE A/C Seater / Sleeper (2+2)
            </div>
          </div>

          <div className="px-3">
            <div className="font-bold text-right">₹{data.price}</div>
            <div className="text-[12px] text-gray-800">
              items {data.bus.totalSeats} Seats Left
            </div>
          </div>
        </div>
        <div className="flex mb-2 py-1 bg-gray-100 w-[100%] px-3">
          <div className="bg-green-600 text-white rounded-md text-[14px] px-2 py-0">
            0.0{" "}
          </div>
          <div className="text-[10px] pt-1 pl-3">24 Ratings</div>
        </div>
        <div>
          {" "}
          <div className="flex justify-between px-3">
            <div className="grid">
              <div className="flex align-baseline align-text-bottom items-baseline">
                <div className="pr-1 font-bold">{data.arrivalTime.time}</div>
                <div className="text-[13px] ">{data.arrivalTime.date}</div>
              </div>
              <div className="first-letter:uppercase text-[13px] font-semibold">
                {data.origin}
              </div>
            </div>
            <div className="border-b-2 border-gray-300 px-2">
              {data.duration}
            </div>

            <div className="grid">
              <div className="flex items-baseline">
                <div className="pr-1 font-bold">{data.departureTime.time}</div>
                <div className="text-[13px]">{data.departureTime.date}</div>
              </div>
              <div className="first-letter:uppercase text-[13px] font-semibold">
                {data.destination}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusDetails