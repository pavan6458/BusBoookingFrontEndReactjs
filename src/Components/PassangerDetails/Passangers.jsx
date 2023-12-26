import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BusDetails from "./BusDetails";
import { arrayOfSeat } from "./DummySeatNo";
import BookingSidebar from "./BookingSidebar";
import apiUrl from "../../constants/projectConstants";

function Passengers() {
  const myPassengersNo = useLocation().state.passangers;
  const data = useLocation().state;
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const [array1, setArray1] = useState(arrayOfSeat);

  useEffect(() => {
    const passengersList = [];
    const passengerTemplate = {
      seatNumber: "",
      seatNumberError:false,
      firstName: "",
      firstNameError:false,
      age: "",
      ageError:false,
      gender: "",
      genderError:false,
    };

    for (let i = 0; i < myPassengersNo; i++) {
      passengersList.push({ ...passengerTemplate });
    }

    setPassengers(passengersList);
    getReservedSeats();
    console.log("pass",passengers)
  }, [myPassengersNo]);


  const checkBlanks = () => {
    let isVerified = true;
  
    const updatedPassengers = passengers.map((passenger, index) => {
      let updatedPassenger = { ...passenger };
      
      if (passenger.seatNumber === "") {
        isVerified = false;
        updatedPassenger.seatNumberError = true;
      } else {
        updatedPassenger.seatNumberError = false;
      }
  
      if (passenger.firstName === "") {
        isVerified = false;
        updatedPassenger.firstNameError = true;
      } else {
        updatedPassenger.firstNameError = false;
      }
  
      if (passenger.age === "") {
        isVerified = false;
        updatedPassenger.ageError = true;
      } else {
        updatedPassenger.ageError = false;
      }
  
      if (passenger.gender === "") {
        isVerified = false;
        updatedPassenger.genderError = true;
      } else {
        updatedPassenger.genderError = false;
      }
  
      return updatedPassenger;
    });
    
    setPassengers(updatedPassengers);
    return isVerified;
  };
  

  const getReservedSeats = () => {
    
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

    fetch(apiUrl + `api/bus/checkReversed/${data.updatedItem
      .id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        removeCommonElements(array1,result.Response.seatReserved)
      })
      .catch((error) => console.log("error", error));
    
  };

  const removeCommonElements = (array1,array2) => {
    const filteredArray1 = array1.filter(item => !array2.includes(item));
    setArray1(filteredArray1);
  };

  const handelChanger = (index, parameterName, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][parameterName] = value;
    updatedPassengers[index][parameterName+"Error"] = false;
    setPassengers(updatedPassengers);
    console.log("passengers", passengers);
  };

  const paymentPage = (totalPayment) => {
    if(checkBlanks())
    {
      const paymentData = {
        ...data,
        amount: Math.round(totalPayment),
        passangers: passengers,
      };
      navigate("/payment", { state: paymentData });
    }
    
  };

  return (
    <div className="flex w-full pl-[12%] mt-5">
      <div className="w-[60%]">
        <BusDetails className="w-full" />
        <div className="border-1 border-gray-300 rounded-xl mt-3 py-2 px-3 pb-4">
          <div className="font-bold pt-3 pb-1">Traveller Details</div>
          {passengers.map((passenger, index) => {
            console.log("passenger[index]",)
            return (
              <div className="flex justify-around" key={index}>
                <div className="grid space-y-1">
                  <label className={`text-sm $`}>Seat No</label>
                  <select
                    className={`border-1 h-[30px] rounded mr-[10px] border-gray-400 py-0 ${passengers[index]?.seatNumberError==true && `border-2 border-red-400`}`}
                    onChange={(e) => {
                      handelChanger(index, "seatNumber", e.target.value);
                    }}
                  >
                     <option value="">option</option>;
                    {array1.map((index) => {
                      return <option value={index}>{index}</option>;
                    })}
                  </select>
                </div>
                <div className="grid space-y-1">
                  <label className="text-sm">Name</label>
                  <input
                    className={`border-1 rounded border-gray-400 h-[30px] mr-[10px] pl-2 ${passengers[index]?.firstNameError==true && `border-2 border-red-400`}`}
                    onChange={(e) => {
                      handelChanger(index, "firstName", e.target.value);
                    }}
                  ></input>
                </div>
                <div className="grid space-y-1">
                  <label className="text-sm">Age</label>
                  <input
                  type="number"
                    className={`border-1 rounded border-gray-400 h-[30px]  ${passengers[index]?.ageError==true && `border-2 border-red-400`}`}
                    onChange={(e) => {
                      handelChanger(index, "age", e.target.value);
                    }}
                  ></input>
                </div>
                <div className="grid space-y-1">
                  <label className="text-sm ml-[10px]">Gender</label>
                  <select
                    className={`border-1 h-[30px] py-0 pl-[5px] rounded ml-[10px] border-gray-400 ${passengers[index]?.genderError==true && `border-2 border-red-400`}`}
                    onChange={(e) => {
                      handelChanger(index, "gender", e.target.value);
                    }}
                  >
                    <option>Choose</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-1 border-gray-300 mt-3 rounded-xl p-2 px-3 pb-3">
          <p className="font-bold">Contact Details</p>
          <div className="flex mt-2">
            <div className="grid w-[40%] mr-[10%]">
              <label className="text-[13px] font-bold text-gray-600 ml-[2px]">
                Email Id
              </label>
              <input className="h-[30px] border-1 rounded border-gray-400"></input>
            </div>
            <div className="grid w-[40%] mr-[10%]">
              <label className="text-[13px] font-bold text-gray-600 ml-[2px]">
                Mobile Number*
              </label>
              <input className="h-[30px] border-1 rounded border-gray-400"></input>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <BookingSidebar paymentPage={paymentPage} />
      </div>
    </div>
  );
}

export default Passengers;
