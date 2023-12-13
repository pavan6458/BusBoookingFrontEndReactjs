import React from 'react'
import DateSearch from "./DateSearch.jsx";
import GuestSearch from "./GuestSearch.jsx";
import PickUpLocation from "./PickUpLocation.jsx";
import DropOffLocation from "./DropOffLocation.jsx";
import { FaSearch } from "react-icons/fa";


function BusSearch() {
  return (
    <div className='flex justify-center mt-[4%]'>
         <div className="  bg-white w-fit  rounded shadow border-2">
        <div className="flex items-center p-4">
          <PickUpLocation />
         

          <DropOffLocation />
              
           <DateSearch />

          <GuestSearch />
     

          <div className="button-item">
            <button
              className="mainSearch__submit button  flex py-3 col-12 rounded font-bold px-10 border-l bg-gray-950 -blue-1 text-white"
        
            >
             <FaSearch className='mt-0.5 mr-3'/>
              <p>Search</p>
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </div>
  )
}

export default BusSearch