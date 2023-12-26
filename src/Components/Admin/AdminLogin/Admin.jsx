import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Admin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const loginapi = () => {
    var credentials = btoa(email + ":" + password);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${credentials}`);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch("http://localhost:8080/api/admin/public/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          const Authorization = response.headers.get("Authorization");
          localStorage.setItem("Authorization", Authorization);
        } else if (response.status === 401) {
          Swal.fire({
            icon: "error",
            text: "Invalid credentials",
          });
          throw new Error("Invalid credentials");
        }
        return response.json(); // Return the result here
      })
      .then((result) => {
        console.log(result);
        if (result.StatusCode === "OK") {
          sessionStorage.setItem("companyName", result.Response.companyName);
          sessionStorage.setItem("id", result.Response.id);
          navigate("/BusHome");
        }
      })
      .catch((error) => console.log("error", error));
  };
  
  return (
    <div className="flex justify-center mt-10 text-center">
      <div className="w-[50%]"></div>
      <div className="w-[50%] flex justify-center mt-[6%]">
        <div className="w-[80%] grid justify-center">
          <div className="border-2 rounded-lg border-gray-200 shadow-lg   grid justify-center w-fit px-[20px] mt-[10%]  pb-[30px]">
            <h1 className="font-bold text-[30px] pb-[40px] pt-[20px]">
              Welcome Back
            </h1>
            <div className="grid mb-3  ">
              <label className="text-left font-bold text-gray-500 pb-1">
                Username
              </label>
              <input className="border-1 w-[350px] h-[35px] rounded border-gray-500 pl-2" onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className="grid mb-3">
              <label className="text-left font-bold text-gray-500 pb-1">
                password
              </label>
              <input className="border-1 w-[350px] h-[35px] rounded border-gray-500 pl-2" type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
              <button className="w-full h-[35px] w-[350px] bg-blue-500 font-bold rounded text-white text-[20px]" onClick={loginapi}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
