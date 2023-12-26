import React from "react";
import Header from "../Header/Header";
import Passangers from "./Passangers";

function CompleteBooking() {
  return (
    <div>
      <Header />
      <p className=" pl-[12%] h-[40px] bg-blue-500 text-white font-extrabold align-middle flex text-[20px] items-center align-middle ">
        Complete your booking
      </p>
      <Passangers className="w-[100%]" />
    </div>
  );
}

export default CompleteBooking;
