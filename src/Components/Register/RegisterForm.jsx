import React, { useState } from "react";
import apiUrl from "../../constants/projectConstants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [phone, setPhone] = useState();
  localStorage.setItem("phone",phone);
  const router = useNavigate();
  const registerApi = () => {
 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile: phone,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "api/user/public/SendOtp", requestOptions)
      .then((response) => {
        response.json();
        if (response.status == 201) {
          
          // Swal.fire({
          //   icon: "success",
          //   text: "Otp sent Successfully",
         
          // });
          localStorage.setItem("phone",phone);
          router("/otpverify");
        }
        else if(response.status == 409)
        {
          Swal  .fire({
            icon: "error",
            text: "Account Already exists ",
         
          });
        }
        
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex justify-center">
      <div className="grid justify-center w-fit content-center mt-[10%] border border-1 shadow rounded-lg px-7 pt-5 border-2">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Get Started With BookMyYatra
        </h5>

        <div className="grid mt-4">
        <label className="font-bold text-gray-500 pb-3">
          Enter Phone Number
        </label>

          <input
            type="number"
            name="email"
            onChange={(e) => {
              e.preventDefault();
              setPhone(e.target.value);
            }}
            id="email"
            class="bg-gray-200 rounded border  border-2 px-2 border-gray-200 focus:bg-white focus:border-cyan-500 focus:outline-none   w-[400px] py-2"
            placeholder="0000000000000"
            required
          />
        </div>

        <button
          onClick={registerApi}
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mt-5 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Account
        </button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mb-5 mt-5">
          Not registered?{" "}
          <a
            href="/Login"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </a>
        </div>
      </div>
      <>
      </>
    </div>
  );
}

export default RegisterForm;
