import React, { useState } from "react";
import apiUrl from "../../constants/projectConstants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigate();

  const loginApi = () => {  
    if (email != null && password != null) {
      var credentials = btoa(email + ":" + password);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic " + credentials);
      myHeaders.append("Cookie", "JSESSIONID=3B2A6562910A24153003122DAE03F38F");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(apiUrl + "api/user/public/login", requestOptions)
        .then((response) => {
          if(response.status == 200)

          {
           const Authorization  =  response.headers.get("Authorization");
            localStorage.setItem("Authorization",Authorization)
          }
          else if (response.status === 401) {
            Swal.fire({
              icon: "error",
              text: "Invalid credentials",
            });
            throw new Error("Invalid credentials"); // Throw an error to skip the next 'then' block
          }
          return response.json(); // Return the parsed JSON
        })
        .then((result) => {
          
          console.log("Login successful:", result);
          if(result.StatusCode=="OK"){
            localStorage.setItem("name",result.Response.name);
            localStorage.setItem("id",result.Response.id);
            localStorage.setItem("email",result.Response.email)
            localStorage.setItem("phone",result.Response.mobileNumber)
            

            navigator("/")
          }

        })
        .catch((error) => {
      
          console.error("Error:", error);
        });
    } else {
      Swal.fire({
        icon: "error",

        text: "please Enter Mobile Number and Password",
      });
    }
  };

  return (
    <div className="flex justify-center">
<div className="grid justify-center w-[100%] content-center mt-[10%] border-2 border-gray-300 shadow p-5 pt-5 rounded-lg w-fit">
      <div className="grid">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Login Details
        </h5>
        <label className="font-bold text-gray-500 pb-3 mt-4">
          Enter Phone Number
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 rounded border  border-2 px-2 border-gray-200 focus:bg-white focus:border-cyan-500 focus:outline-none   w-[400px] py-2"
        />
      </div>
      <div className="grid mt-3">
        <label className="font-bold text-gray-500 pb-3">Enter Password</label>
        <input
          value={password}
          className="bg-gray-200 rounded border  border-2 px-2 border-gray-200 focus:bg-white focus:border-cyan-500 focus:outline-none   w-[400px] py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mt-5 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={loginApi}
      >
        Sign in
      </button>
    </div>
    </div>
    
  );
}

export default LoginForm;
