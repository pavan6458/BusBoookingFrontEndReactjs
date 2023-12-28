import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login/index";
import Homepage from "./Components/Homepage/Homepage";
import Register from "./Components/Register";
import OtpVerify from "./Components/OtpVerify/OtpVerify";
import Profile from "./Components/ProfileCreation/Profile";
import SearchList from "./Components/SearchList";
import Header from "./Components/Header/Header";
import MyProfile from "./Components/MyProfile/MyProfile";
import CompleteBooking from "./Components/PassangerDetails";
import PaymentPage from "./Components/Payment";
import MyBooking from "./Components/MyBookings";
import SingleBookingInfo from "./Components/IndividualBookingInfo";
import Admin from "./Components/Admin/AdminLogin/Admin";
import AdminHomepage from "./Components/Admin/main/Main";
import Schedule from "./Components/Admin/Schedule/Schedule";
import HomepageAdmin from "./Components/Admin/HomePage/Homepage";
import Bus from "./Components/Admin/Bus/Bus";
import BusOperator from "./Components/Admin/BusOperator/BusOperator";
import Bookings from "./Components/Admin/Bookings/Bookings";

function App() {
  const [admin, setAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  useEffect(()=>{
   const id= sessionStorage.getItem("id");
   const admin = sessionStorage.getItem("ui");
   if(id)
   {
    setIsAdminAuthenticated(true)
   }

   if(admin==1)
   {
    setAdmin(true);
   }
  })
  const granted =(data)=>{
    setIsAdminAuthenticated(data)
  }

  const adminaccess =(props)=>{
    if(props==true)
    {
      sessionStorage.setItem("ui",1)
      setAdmin(true)
    }
    
  }

  const publicRoutes = (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/otpverify" element={<OtpVerify />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/header" element={<Header />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/busearch" element={<SearchList />} />
      <Route path="/completeBooking" element={<CompleteBooking />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/MyBooking" element={<MyBooking />} />
      <Route path="/individual" element={<SingleBookingInfo />} />
      <Route path="/Admin" element={<Admin adminaccess={adminaccess} />} />
    </Routes>
  );

  const adminRoutes = (
    
    isAdminAuthenticated ?  
     <div className="flex">
      <div className="w-[20%]">
        <AdminHomepage />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomepageAdmin />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/busoperator" element={<BusOperator />} />
          <Route path="/booking" element={<Bookings />} />
        </Routes>
      </div>
    </div>

    : <Admin granted ={granted}/>
    
  );

  return admin ? adminRoutes : publicRoutes;
}

export default App;
