import React from "react";
import { useLocation } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

function BookingData(props) {
  const data = useLocation().state;
  console.log("data", data);
  return (
    <div>
      <div className="border-1 border-gray-300    rounded w-full">
        <p className="border-b border-gray-200 px-3 py-1 font-bold">
          Your Booking
        </p>
        <div className="flex my-2">
          <div className="my-[10px] mx-3">
            <FaBus />
          </div>
          <div>
            <p className="text-sm font-bold">{data.updatedItem.bus.busName}</p>
            <p className="text-sm">VE A/C SEATER / SLEEPER (2+2)</p>
          </div>
        </div>
        <div className="flex w-full my-3">
          <div className="my-[10px] mx-3 my-2 flex align-middle items-center">
            <FaClock />
          </div>
          <div className="flex justify-between w-full mr-3 items-center">
            <div>
              <p className="text-sm my-0 py-0 leading-[-10]">
                {data.updatedItem.arrivalTime.date}
              </p>
              <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                {data.updatedItem.arrivalTime.time}
              </p>
              <p className="text-sm my-0 py-0 leading-[-10]">
                {data.updatedItem.origin}
              </p>
            </div>
            <div className="text-sm bg-gray-200 h-fit mr-[5%]">
              {data.updatedItem.duration}
            </div>
            <div>
              <p className="text-sm my-0 py-0 leading-[-10]">
                {data.updatedItem.departureTime.date}
              </p>
              <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                {data.updatedItem.departureTime.time}
              </p>
              <p className="text-sm my-0 py-0 leading-[-10]">
                {data.updatedItem.destination}
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 w-full"></div>
        <div>
          <div className="flex ">
            <div className="my-[10px] mx-3">
              <MdAirlineSeatReclineNormal />
            </div>

            <div className="mt-2">
              <p className="font-bold text-sm">Seats</p>

              {data.passangers.map((items, index) => {
                return (
                  <li className="text-sm">
                    Seat {index + 1} - {items.seatNumber}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 w-full mt-2"></div>

        <div>
          <div className="flex mt-1 mb-2">
          <div className="my-[10px] mx-3"><FaRegUser/></div>
            <div>
              <p className="text-sm mt-2 font-bold">Traveler's</p>
              {data.passangers.map((items, index) => {
                return (
                  <div className="text-sm">
                    {index+1}. {items.firstName}({items.gender.slice(0,1)},{items.age})
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className='flex justify-between p-3'>
        <div className='font-bold text-sm'>Total Due</div>
        <div className='font-bold text-sm'>₹{data.amount}</div>
      </div>
      </div>
    </div>
  );
}

export default BookingData;
