import React, { useEffect, useState } from "react";
import apiUrl from "../../constants/projectConstants";
import Swal from "sweetalert2";

function MyProfileData() {
  const authToken = localStorage.getItem("Authorization");
  const id = localStorage.getItem("id");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [Phone, setPhone] = useState();

  useEffect(() => {
    getUser();
  }, [id]);

  const getUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiUrl + `api/user/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setName(result.Response.name);
        setEmail(result.Response.email);
        setPhone(result.Response.mobileNumber);
      })
      .catch((error) => console.log("error", error));
  };

  const updateProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      id: id,
      name: name,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "api/user/private/updateProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
      if(result.StatusCode == "OK"){
        Swal.fire({
          icon: "success",
          text: "Updated Successfully",
        });
        getUser();
      }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="bg-white w-fit rounded-lg w-[70%] pt-4">
      <div className="pl-4 mt-3 border-l-4 border-gray-400">
        <h3 className="text-2xl font-bold">Profile</h3>
        <p className="font-thin">Basic info, for a faster booking experience</p>
      </div>

      <div className=" pl-4 py-2 border-b-2">
        <label className="text-[13px] w-[20%]">Name</label>
        <input
          className="border-none p-0 pt-2 focus:ring-0 ml-10 text-[13px]"
          autoComplete="off"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className=" pl-4 py-2 border-b-2">
        <label className="text-[13px] w-[20%]">MOBILE NUMBER</label>
        <input
          className="border-none p-0 pt-2 focus:ring-0 ml-10 text-[13px]"
          autoComplete="off"
          type="text"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}

        />
      </div>
      <div className=" pl-4 py-2 border-b-2">
        <label className="text-[13px] w-[20%]">EMAIL ID </label>
        <input
          className="border-none p-0 pt-2 focus:ring-0 ml-10 text-[13px]"
          autoComplete="off"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
      </div>
      <div className=" pl-4 py-2 border-b-2">
        <label className="text-[13px] w-[20%]">password</label>
        <input
          className="border-none p-0 pt-2 focus:ring-0 ml-10 text-[13px]"
          autoComplete="off"
          type="password"
          value="**********"
        />
      </div>
      <div className="pl-4">
        <button
          className="border-2 px-5 py-2 bg-gray-800 text-white font-bold mt-4 mb-2 rounded-lg"
          onClick={updateProfile}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default MyProfileData;
