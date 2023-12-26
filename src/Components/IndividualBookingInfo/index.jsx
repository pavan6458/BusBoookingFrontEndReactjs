import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import apiUrl from "../../constants/projectConstants";

function SingleBookingInfo() {
  const [passangersList, setPassangersList] = useState([]);
  const data = useLocation().state;
  console.log("data", data);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjU3MjE4MzQzMywiaWF0IjoxNzAyODM4NDE5LCJleHAiOjE3MDUyNTc2MTl9.wLcOI8rNECPAaLEHtyldYX_yyoh-6F08cUqAJXO52Zo"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      apiUrl + `api/bus/passangers/getByBookingId/${data.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPassangersList(result.Response);
      })
      .catch((error) => console.log("error", error));
  }, [data.id]);
  return (
    <div className="">
      <Header />
      <div className="flex justify-center mt-[5%]">
        <div className="rounded border-1 border-gray-300 w-[50%] shadow-xl">
          <h4 className="text-xl my-1 py-1 font-bold pl-4 mt-3 border-l-8 border-gray-500">Booking Info</h4>
          <div className="   rounded w-full">
            <div className="flex my-2 px-4">
              <div>
                
                <p className="text-sm font-bold">{data.schedule.busName}</p>
                <p className="text-sm">VE A/C SEATER / SLEEPER (2+2)</p>
              </div>
            </div>
            <div className="flex w-full my-3 px-4">
              <div className="flex justify-between w-full mr-3 items-center">
                <div>
                  <p className="text-sm my-0 py-0 leading-[-10]">
                    {data.arrivalDate.date}
                  </p>
                  <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                    {data.arrivalDate.time}
                  </p>
                  <p className="text-sm my-0 py-0 leading-[-10]">
                    {data.schedule.origin}
                  </p>
                </div>
                <div className="text-sm bg-gray-200 h-fit mr-[5%]">
                  {data.schedule.duration}
                </div>
                <div>
                  <p className="text-sm my-0 py-0 leading-[-10]">
                    {data.DepatureDate.date}
                  </p>
                  <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                    {data.DepatureDate.time}
                  </p>
                  <p className="text-sm my-0 py-0 leading-[-10]">
                    {data.schedule.destination}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 w-full"></div>
            <div>
              <div className="flex ">
                <div className="mt-2 px-4">
                  <p className="font-bold text-sm">Seats Reserved</p>

                  {passangersList.map((items, index) => {
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
              <div className="flex mt-1 mb-2 px-4">
                <div>
                  <p className="text-sm mt-2 font-bold">Traveler's</p>
                  {passangersList.map((items, index) => {
                    return (
                      <div className="text-sm">
                        {index + 1}. {items.firstName}(
                        {items.gender.slice(0, 1)},{items.age})
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between p-4  ">
              <div className="font-bold text-sm">Ticket Price</div>
              <div className="font-bold text-sm">₹{data.totalAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookingInfo;
