import React from "react";
import PaymentMode from "./PaymentMode";
import BookingData from "./BookingData";
import Summary from "./Summary";
import Header from "../Header/Header";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Swal from "sweetalert2";
import apiUrl from "../../constants/projectConstants";

function PaymentPage() {
  const data = useLocation().state;
  const navigator = useNavigate();

  const addpassangerAndBook = () =>{

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjU3MjE4MzQzMywiaWF0IjoxNzAyODM4NDE5LCJleHAiOjE3MDUyNTc2MTl9.wLcOI8rNECPAaLEHtyldYX_yyoh-6F08cUqAJXO52Zo");

var raw = JSON.stringify({
  "bookingId": data.updatedItem.bookingId,
  "scheduleId": data.updatedItem.id,
  "passangerLists": data.passangers
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(apiUrl+"api/bus/passangers/addpassangers", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
  if(result.StatusCode == "CREATED")
  {
    Swal.fire({
      icon: "success",
      text: "Booking Done",
    });
     navigator("/")  
    throw new Error("Invalid credentials"); 

  }
  else if(result.message == "Please restart the booking")
  {
    Swal.fire({
      icon: "error",
      text: "Timeout restart the booking",
    });
    navigator("/") 
  }
  }
  
  )
  .catch(error => console.log('error', error));

  }
  return (
    <>
    <Header/>
    <div className="flex w-full mt-10">
      <div className="w-[60%] pl-[15%]">
        <PaymentMode addpayment ={addpassangerAndBook}/>
      </div>
      <div className="pl-[1%] w-[40%] pr-[10%] space-y-4  ">
        <BookingData />
     
      </div>
    </div>
    </>
    
  );
}

export default PaymentPage;
