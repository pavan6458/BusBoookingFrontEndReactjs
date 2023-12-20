import React, { useState } from "react";
import apiUrl, { myHeaders } from "../../constants/projectConstants";
import { useNavigate } from "react-router-dom";
function PofileForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const phone = localStorage.getItem("phone");
  const authToken = localStorage.getItem("Authorization");
  const navigator = useNavigate();
  const ProfileApi = () => {
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      name: name,
      mobileNumber: phone,
      email: email,
      profilePicture: "www..google.com",
      passwardHash: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "api/user/private/createProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        if (result.Message === "Profile Created seccessfully") {
        localStorage.setItem("name",result.Response.name);
        localStorage.setItem("id",result.Response.id);
        localStorage.setItem("email",result.Response.email)
        navigator("/")
        
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <div class="max-w-md mx-auto border-2 p-5 rounded-lg mt-[5%]">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Profile Details
        </h5>
        <div class="mb-4">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={ProfileApi}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PofileForm;
