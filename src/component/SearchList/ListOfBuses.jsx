import React, { useEffect, useState } from "react";
import DateSearch from "../BusSearch/DateSearch";
import GuestSearch from "../BusSearch/GuestSearch";
import { FaSearch } from "react-icons/fa";
import DropOffLocation from "../BusSearch/DropOffLocation";
import PickUpLocation from "../BusSearch/PickUpLocation";
import { useLocation } from "react-router-dom";
import apiUrl from "../../constants/projectConstants";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";


function ListOfBuses() {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(
    location.state.selectedLocation
  );
  const [selectedBus, setSelectedBus] = useState(null);
  const [dropLocation, setDropLocation] = useState(location.state.dropLocation);
  const [date, setDate] = useState(location.state.date);
  const [data, setData] = useState([]);
  const [booking,setBooking]=useState();

  useEffect(() => {
    getAllSchedule();
    console.log("date", new Date("2023-12-20T12:00:00.000+00:00").getMonth());
  }, [date]);

  const convertTimeStamp = (date1) => {
    const date = new Date(date1);

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return {
      date: `${day.toString()} ${monthName.substring(0, 3)}`,
      time: `${hours}:${minutes}`,
    };
  };

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
      })
      .catch((error) => console.log("error", error));
  };

  const handelexpand = (index) => {
    if (selectedBus === index) {
      setSelectedBus(null);
    } else {
      setSelectedBus(index);
    }
  };

  const handelBookExpand = (index) => {
    if (selectedBus === index) {
      setBooking(null);
    } else {
      setBooking(index);
    }
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
            <GuestSearch />

            <div className="button-item">
              <button
                className="mainSearch__submit button  bg-blue-800 flex py-3 col-12 rounded font-bold px-10 border-l bg-gray-z -blue-1 text-white"
                onClick={getAllSchedule}
              >
                <FaSearch className="mt-0.5 mr-3" />
                <p>Search</p>
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
      </div>
      <div className="flex mt-[2%]">
        <div className="w-[20%] ml-[2%] px-3 mr-[2%] py-3  shadow-lg h-fit rounded ">
          <h1 className="border-b-2 border-gray-300  pb-2 font-bold text-gray-600">
            Filter
          </h1>
          <div>
            <p className="p-2">AC</p>
            <div className="flex justify-around py-2 pt-1  border-b-2 border-gray-300 pb-3">
              <button className="border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold ">
                AC
              </button>
              <button className="border-1 border-gray-300 px-6 py-1 rounded-lg text-sm w-[45%] text-black hover:bg-blue-500 hover:text-white hover:font-bold ">
                NON - AC
              </button>
            </div>

            <div className="border-b-2 border-gray-300 pb-1">
              <div className="pt-2 ">Seat type</div>
              <div>
                <div className="flex justify-around my-2 mb-2">
                  <button className="border-1 w-[45%] border-gray-300 px-3 py-1 rounded-lg text-sm  text-black">
                    Sleeper
                  </button>
                  <button className="border-1 border-gray-300 px-3 py-1 rounded-lg w-[45%] text-sm  text-black">
                    Seater
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-1">
              <div className="pt-2 ">Pick Up Time - Bangalore</div>
              <div>
                <div className="flex justify-around my-2 mb-2">
                  <button className="border-1 border-gray-300 w-[45%] px-3 py-1 rounded-lg text-sm  text-black">
                    6AM to 11Am
                  </button>
                  <button className="border-1 border-gray-300 px-3 py-1 w-[45%] rounded-lg text-sm  text-black">
                    6AM to 11Am
                  </button>
                </div>
                <div className="flex justify-around my-2  mb-2">
                  <button className="border-1 border-gray-300 px-3 py-1 w-[45%] rounded-lg text-sm  text-black">
                    6AM to 11Am
                  </button>
                  <button className="border-1 border-gray-300 px-3 py-1 rounded-lg text-sm  w-[45%] text-black">
                    6AM to 11Am
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-[75%]">
          {data.map((items, index) => {
            const arrivalTime = convertTimeStamp(items.arrivalTime);
            const departureTime = convertTimeStamp(items.departureTime);
            return (
              <div
                className={`shadow-lg grid min-w-[80%] mb-4 h-fit rounded-xl px-3 py-2 mr-[3%] hover:border-2 hover:border-blue-500  ${selectedBus === index &&
                "border-2 border-blue-600 "
                }`}
              >
                <div className="flex justify-between border-b-2 pb-2 border-gray-300">
                  <div>
                    <p
                      className="text-[13px] font-bold capitalize
                    "
                    >
                      {items.bus.busName}
                    </p>
                    <div className="text-[14px] uppercase text-gray-600 mb-4">
                      VE A/C Seater / Sleeper (2+2)
                    </div>
                    <div className="flex">
                      <div className="bg-green-600 text-white rounded-md text-[14px] px-2 py-0">
                        0.0{" "}
                      </div>
                      <div className="text-[10px] pt-1 pl-3">24 Ratings</div>
                    </div>
                  </div>
                  <div className="flex pr-[10%]">
                    <div className="flex align-baseline align-text-bottom items-baseline">
                      <div className="pr-1 font-bold">{arrivalTime.time}</div>
                      <div className="text-[13px] ">{arrivalTime.date}</div>
                    </div>
                    <div className="h-[17%] mx-1 border-b-2 border-gray-300 w-[40px]"></div>
                    <div className="">{items.duration}</div>
                    <div className="h-[17%] mx-1 border-b-2 border-gray-300 w-[40px]"></div>
                    <div className="flex items-baseline">
                      <div className="pr-1 font-bold">{departureTime.time}</div>
                      <div className="text-[13px]">{departureTime.date}</div>
                    </div>
                  </div>

                  <div className="">
                    <div className="font-bold text-right">₹{items.price}</div>
                    <div className="text-[12px] text-gray-800">
                      items {items.bus.totalSeats} Seats Left
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center align-middle">
                  <button
                    className={`text-left text-[13px] rounded px-3 flex items-center align-middle ${
                      selectedBus === index &&
                      "bg-gray-200 font-bold py-1 text-blue-400"
                    }`}
                    onClick={() => handelexpand(index)}
                  >
                    <>amenities</>
                    <FaChevronDown className=" pl-1" />
                  </button>
                  <botton className="text-white text-[13px] cursor-pointer active:bg-black bg-blue-600 w-fit rounded px-3 py-1 mt-2 font-bold uppercase {selectedBus === index  && bg-red-500}"
                  onClick={()=>handelBookExpand(index)}
                  >
                    select seats
                  </botton>
                </div>
                {booking === index && <div className="flex justify-end">
                  <select className="border-1 border-gray-300 h-[35px] w-[100px] text-center rounded mt-2 items-center pb-1"> 
                  <option>select No of seats</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>

                  <button className="w-100px justify-center items-center align-middle pt-[2px] px-3 border-2 border-gray-600 rounded h-[35px] mt-2 ml-2 flex hover:scale-105"><>Book</><FaArrowRightLong/></button>
                  </div>}
                {selectedBus === index && <div>hi</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListOfBuses;
