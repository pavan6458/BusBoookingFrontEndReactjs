import React from "react";
import { useLocation } from "react-router-dom";

function BookingSidebar(props) {
  const data = useLocation().state;
  const price = data.passangers * data.updatedItem.price;
  const tax = data.passangers * data.updatedItem.price * 0.03;
  return (
    <div className="ml-2">
      <div className="rounded-xl border-1 p-3 border-gray-300">
        <p className="font-bold text-sm">Offers</p>
      </div>
      <div className="rounded-xl border-1 p-3 border-gray-300 mt-3">
        <p className="font-bold text-sm">Price details</p>
        <div className="flex justify-between mt-3">
          <p className="text-sm">Base Fare</p>
          <p className="font-bold">₹{price}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-sm">Tax</p>
          <p className="font-bold">₹{tax}</p>
        </div>
        <div className="border-1 border-gray-200 mt-3"></div>
        <div className="flex justify-between mt-1">
          <p className="text-sm">Total Amount</p>
          <p className="font-bold">₹{price + tax}</p>
        </div>

        <button
          className="bg-blue-500 rounded-lg w-full text-white font-bold h-[35px] mt-3"
          onClick={() => props.paymentPage(price + tax)}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default BookingSidebar;
