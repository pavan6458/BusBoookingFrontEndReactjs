// App.js
import React, { useState } from "react";
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

function App() {
  const [admin, setAdmin] = useState(true);
  return admin ? (


    <div className="flex">
        <div className="w-[20%]">
          <AdminHomepage />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Schedule />} />
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
            <Route path="/Admin" element={<Admin />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>

   
  ) : (
    <>
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
      <Route path="/Admin" element={<Admin />} />
      {/* Add more routes as needed */}
    </Routes>
    </>
  );
}

export default App;
