import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import apiUrl from "../../constants/projectConstants";
import { useNavigate } from "react-router-dom";

function MyBooking() {
  const [booking, setBooking] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjE3Mjc0NTYzOSwiaWF0IjoxNzAyNzIyMjYyLCJleHAiOjE3MDUxNDE0NjJ9.Haj2L89N5H8nyF4sio0pkLiRCLEoEOoVrJkc65Uy26A"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiUrl + `api/user/booking/All/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const filteredData = result.Response.filter(
          (items) => items.status != "in-progress"
        );
        setBooking(filteredData);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const convertTimeStamp = (date1) => {
    const date = new Date(date1);

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return {
      date: `${day.toString()} ${monthName.substring(
        0,
        3
      )} ${date.getFullYear()}`,
      time: `${hours}:${minutes}`,
    };
  };
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <div className="w-[20%] flex justify-end p-3">
          {" "}
          <h5 className="text-end text-xl font-bold border-b-2 border-gray-400 w-fit">
            Booking History
          </h5>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] ">
          <table className="w-full px-[10%] table-auto">
            <thead className="">
              <tr className=" justify-around justify-center bg bg-gray-300  text-center">
                <th className="  uppercase py-2">Booking Id</th>
                <th className=" uppercase  py-2">bus </th>
                <th className=" uppercase ">origin</th>
                <th className="  uppercase">destination</th>
                <th className=" uppercase ">arrival Time</th>
                <th className=" uppercase ">departure Time</th>
                <th className="  uppercase">Passengers</th>
                <th className="  uppercase">Status</th>
                <th className="  uppercase">price</th>
                <th className="  "></th>
              </tr>
            </thead>
            <tbody className="text-center ">
              {booking.map((list) => {
                const arrivalDate1 = convertTimeStamp(
                  list.schedule.arrivalTime
                );
                const DepatureDate1 = convertTimeStamp(
                  list.schedule.departureTime
                );

                const updated = {
                  ...list,
                  arrivalDate: arrivalDate1,
                  DepatureDate: DepatureDate1,
                };

                return (
                  <tr className="hover:border-1 border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-200 ">
                    <td className="   py-2 ">{list.id}</td>
                    <td className="   py-2 ">{list.schedule.busName}</td>
                    <td className="   py-2  ">{list.schedule.origin}</td>
                    <td className="   py-2  ">{list.schedule.destination}</td>
                    <td className="   py-2  ">
                      {arrivalDate1.time + " " + arrivalDate1.date}
                    </td>
                    <td className="   py-2  ">
                      {DepatureDate1.time + " " + DepatureDate1.date}
                    </td>
                    <td className="   py-2  ">{list.totalPassengers}</td>
                    <td className="   py-2  ">{list.status}</td>
                    <td className="   py-2  ">{list.totalAmount}</td>
                    <td className="   py-2  ">
                      <button
                      className="px-2"
                        onClick={() =>
                          navigate("/individual", { state: updated })
                        }
                      >
                        view
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
