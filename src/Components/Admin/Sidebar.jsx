import React from "react";
import { Navigate } from "react-router-dom";

function Sidebar({onclick}) {
  

    
  return (
      <div className=" w-full h-[100vh] flex justify-center border-r border-gray-400">
        <div className="w-full text-center  ">
        <div  className=" pt-3 w-full  " onClick={()=>onclick("Homepage")}>Homepage</div>
        <div  className=" pt-3 w-full  " onClick={()=>onclick("Schedule")}>Schedule</div>
        <div  className=" pt-3 w-full  " onClick={()=>onclick("Bus")}>Bus</div>
        <div  className=" pt-3 w-full  " onClick={()=>onclick("BusOperator")}>Bus Operator</div>
    
        <div  className=" pt-3 w-full  " onClick={()=>onclick("Bookings")}>Bookings</div>
 
        </div>
      </div>
 
  );
}

export default Sidebar;
