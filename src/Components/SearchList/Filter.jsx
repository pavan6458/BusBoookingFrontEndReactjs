import React, { useEffect, useState } from "react";
import DateSearch from "../BusSearchHome/DateSearch";
import GuestSearch from "../BusSearchHome/GuestSearch";
import { FaSearch } from "react-icons/fa";
import DropOffLocation from "../BusSearchHome/DropOffLocation";
import PickUpLocation from "../BusSearchHome/PickUpLocation";
import { useLocation, useNavigate } from "react-router-dom";
import apiUrl from "../../constants/projectConstants";
import BusList from "./BusList";

function Filter() {
  const location = useLocation();
  const [dropLocation, setDropLocation] = useState(location.state.dropLocation);
  const [selectedLocation, setSelectedLocation] = useState(
    location.state.selectedLocation
  );
  const [date, setDate] = useState(location.state.date);
  const [data, setData] = useState([]);
  const [NoOfPassangers , setNoOfPassangers]=useState(location.state.NoOfPassangers);
  const [acFilter, setAcFilter] = useState();
  const [seatFilter, setSeatFilter] = useState();
  const [pickupFilter, setPickUpFilter] = useState();
  const [originalData, setOriginalData] = useState();

  useEffect(() => {
    getAllSchedule();
  }, []);

  const getAllSchedule = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjE3Mjc0NTYzOSwiaWF0IjoxNzAyNzIyMjYyLCJleHAiOjE3MDUxNDE0NjJ9.Haj2L89N5H8nyF4sio0pkLiRCLEoEOoVrJkc65Uy26A"
    );

    var raw = JSON.stringify({
      arrivalTime: date,
      origin: selectedLocation,
      destination: dropLocation,
    });
    console.log(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "api/bus/scheudle/SeachBuses", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.Response);
        setOriginalData(result.Response);
      })
      .catch((error) => console.log("error", error));
  };

  const applyFilters = () => {
    let filteredData = [...originalData];

    if (acFilter) {
      filteredData = filteredData.filter(
        (item) => item.bus.busType === acFilter
      );
    }

 
    if (seatFilter) {
      filteredData = filteredData.filter(
        (item) => {
        console.log(item.bus.seatType)
        return item.bus.seatType === seatFilter}
      );
    }

  
    if (pickupFilter) {
      const filtertime = (startTime,endTime)=>{
        filteredData = filteredData.filter((item) => {
          console.log("hi", new Date(item.arrivalTime).getUTCHours() < endTime,);
          return (new Date(item.arrivalTime).getUTCHours() >= startTime && new Date(item.arrivalTime).getUTCHours() <= endTime);
        });
      }
      if (pickupFilter === "6AM to 11AM") {
      
        const startTime = 6;
        const endTime = 11;
        filtertime(startTime,endTime)
        
      }
      else if (pickupFilter === "11AM to 6PM") {
      
        const startTime = 11;
        const endTime = 18;
        filtertime(startTime,endTime)
        
      }
      else if (pickupFilter === "6PM to 11PM") {
      
        const startTime = 18;
        const endTime = 23;
        filtertime(startTime,endTime)
        
      }

      else if (pickupFilter === "11Pm to 6AM") {
      
        const startTime = 23;
        const endTime = 6;
        filtertime(startTime,endTime)
        
      }
      
     
    }
        setData(filteredData);
  };

  const acFilterMethod = (prop) => {
    if (prop != acFilter) setAcFilter(prop);
    else setAcFilter(null);
  };

  const SeatFilterHandler = (prop) => {
    if (prop != seatFilter) setSeatFilter(prop);
    else setSeatFilter(null);
  };

  const timeFilterHandler = (prop) => {
    if (prop != pickupFilter) setPickUpFilter(prop);
    else setPickUpFilter(null);
  };

  return (
    <div>
      <div className="flex justify-center mt-[1%]">
        <div className="  bg-white w-[80%] pl-[2%] rounded shadow border-2">
          <div className="flex items-center p-4 gap-[30px]">
            <PickUpLocation
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />

            <DropOffLocation
              dropLocationmethod={dropLocation}
              onDropChange={setDropLocation}
            />
            <DateSearch onDateChange={date} setDate={setDate} />
            <GuestSearch onchangeNo = {NoOfPassangers} setNoOfPassangers={setNoOfPassangers}/>


            <div className="button-item">
              <button
                className="mainSearch__submit button  bg-blue-800 flex py-3 col-12 rounded font-bold px-10 border-l bg-gray-z -blue-1 text-white"
                onClick={getAllSchedule}
              >
                <FaSearch className="mt-0.5 mr-3" />
                <p>Search</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[2%]">
        <div className="w-[20%] ml-[2%] px-3 mr-[2%] py-3  shadow-lg h-fit rounded ">
         <div className="flex justify-between border-b-2 border-gray-300">
         <h1 className="  pb-2 font-bold text-gray-600">
            Filter
          </h1>
          <button className="font-thin pr-2 pb-1">clear</button>
         </div>
          <div>
            <p className="p-2">AC</p>
            <div className="flex justify-around py-2 pt-1  border-b-2 border-gray-300 pb-3">
              <button
                className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                  acFilter == "AC" && `bg-blue-500 text-white font-bold`
                }`}
                onClick={() => acFilterMethod("AC")}
              >
                AC
              </button>
              <button
                className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                  acFilter == "NON-AC" && `bg-blue-500 text-white font-bold`
                }`}
                onClick={() => acFilterMethod("NON-AC")}
              >
                NON - AC
              </button>
            </div>

            <div className="border-b-2 border-gray-300 pb-1">
              <div className="pt-2 ">Seat type</div>
              <div>
                <div className="flex justify-around my-2 mb-2">
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      seatFilter == "Sleeper" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => SeatFilterHandler("Sleeper")}
                  >
                    Sleeper
                  </button>
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      seatFilter == "Seater" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => SeatFilterHandler("Seater")}
                  >
                    Seater
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-1">
              <div className="pt-2 ">Pick Up Time - Bangalore</div>
              <div>
                <div className="flex justify-around my-2 mb-2">
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      pickupFilter == "6AM to 11AM" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => timeFilterHandler("6AM to 11AM")}
                  >
                    6AM to 11AM
                  </button>
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      pickupFilter == "11AM to 6PM" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => timeFilterHandler("11AM to 6PM")}
                  >
                    11AM to 6PM
                  </button>
                </div>
                <div className="flex justify-around my-2  mb-2">
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      pickupFilter == "6PM to 11PM" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => timeFilterHandler("6PM to 11PM")}
                  >
                    6PM to 11PM
                  </button>
                  <button
                    className={`border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold hover:text-white ${
                      pickupFilter == "11Pm to 6AM" &&
                      `bg-blue-500 text-white font-bold`
                    }`}
                    onClick={() => timeFilterHandler("11Pm to 6AM")}
                  >
                    11Pm to 6AM
                  </button>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 rounded-lg text-white py-1 font-bold active:bg-black active:text-white active:font-bold"
              onClick={() => applyFilters()}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="flex flex-col  w-[75%]">
          <BusList data={data} noOfPassangers={NoOfPassangers} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
