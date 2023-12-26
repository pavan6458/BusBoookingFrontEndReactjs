import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import apiUrl from "../../constants/projectConstants";
import { useNavigate } from "react-router-dom";

function BusList(props) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [booking, setBooking] = useState();
  const [noOfPassangers, setNoOfPassangers] = useState(props.noOfPassangers);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const convertTimeStamp = (date1) => {
    const date = new Date(date1);

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return {
      date: `${day.toString()} ${monthName.substring(0, 3)}`,
      time: `${hours}:${minutes}`,
    };
  };

  const BookApi = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjE3Mjc0NTYzOSwiaWF0IjoxNzAyNzIyMjYyLCJleHAiOjE3MDUxNDE0NjJ9.Haj2L89N5H8nyF4sio0pkLiRCLEoEOoVrJkc65Uy26A"
    );

    var raw = JSON.stringify({
      totalPassengers: noOfPassangers,
      totalAmount: noOfPassangers * data.price,
      status: "in-progress",
      scheduleId: data.id,
      userId: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "api/user/booking/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const withBookingId = {
          ...data,
          bookingId: result.Response.id,
        };
        if (result.StatusCode == "CREATED") {
          navigate("/completeBooking", {
            state: { updatedItem: withBookingId, passangers: noOfPassangers },
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handelBookExpand = (index) => {
    if (selectedBus === index) {
      setBooking(null);
    } else {
      setBooking(index);
    }
  };

  const handelexpand = (index) => {
    if (selectedBus === index) {
      setSelectedBus(null);
    } else {
      setSelectedBus(index);
    }
  };
  console.log("props.data.length", props.data.length);
  return (
    <div>
      {props.data.length != 0 ? (
        props.data.map((items, index) => {
          const convertedarrivalTime = convertTimeStamp(items.arrivalTime);
          const converteddepartureTime = convertTimeStamp(items.departureTime);
          const updatedItem = {
            ...items,
            arrivalTime: convertedarrivalTime,
            departureTime: converteddepartureTime,
          };
          return (
            <div
              className={`shadow-lg grid min-w-[80%] mb-4 h-fit rounded-xl px-3 py-2 mr-[3%] hover:border-2 hover:border-blue-500 pt-3 ${
                selectedBus === index ||
                (booking === index && "border-2 border-blue-600 ")
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
                    <div className="pr-1 font-bold">
                      {updatedItem.arrivalTime.time}
                    </div>
                    <div className="text-[13px] ">
                      {updatedItem.arrivalTime.date}
                    </div>
                  </div>
                  <div className="h-[17%] mx-1 border-b-2 border-gray-300 w-[40px]"></div>
                  <div className="">{updatedItem.duration}</div>
                  <div className="h-[17%] mx-1 border-b-2 border-gray-300 w-[40px]"></div>
                  <div className="flex items-baseline">
                    <div className="pr-1 font-bold">
                      {updatedItem.departureTime.time}
                    </div>
                    <div className="text-[13px]">
                      {updatedItem.departureTime.date}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="font-bold text-right">
                    ₹{updatedItem.price}
                  </div>
                  <div className="text-[12px] text-gray-800">
                    items {updatedItem.bus.totalSeats} Seats Left
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
                <botton
                  className="text-white text-[13px] cursor-pointer active:bg-black bg-blue-600 w-fit rounded px-3 py-1 mt-2 font-bold uppercase {selectedBus === index  && bg-red-500}"
                  onClick={() => handelBookExpand(index)}
                >
                  select seats
                </botton>
              </div>
              {booking === index && (
                <div className="flex justify-end">
                  <select
                    className="border-1 border-gray-300 h-[35px] w-[100px] text-center rounded mt-2 items-center pb-1 pt-[3px] border-2 pl-1 border-gray-800 text-lg"
                    onClick={(e) => setNoOfPassangers(e.target.value)}
                    value={noOfPassangers}
                  >
                    <option>select No of seats</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>

                  <button
                    className="w-100px active:bg-black active:text-white  justify-center items-center align-middle pt-[2px] px-3 border-2 border-gray-600 rounded h-[35px] mt-2 ml-2 flex hover:scale-105"
                    onClick={() => BookApi(updatedItem)}
                  >
                    <>Book</>
                    <FaArrowRightLong />
                  </button>
                </div>
              )}
              {selectedBus === index && <div>hi</div>}
            </div>
          );
        })
      ) : (
        <div className="grid text-center justify-center mr-20 mt-20">
          <p className="text-2xl font-bold">Oops! No buses found.</p>
          <p>please try another date</p>
        </div>
      )}
    </div>
  );
}

export default BusList;
