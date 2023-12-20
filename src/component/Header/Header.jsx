import React from "react";
import { useNavigate } from "react-router-dom";
import UserDropDown from "./UserDropDown";

function Header() {
  const navigate = useNavigate();
  const url = window.location.href;
  const auth = localStorage.getItem("Authorization");
  const name = localStorage.getItem("name");
  return (
    <div>
      <div className="px-10 py-2 flex w-full justify-between border-b-2">
        <button className="text-xl font-medium text-gray-900 dark:text-white mb-2" onClick={()=>navigate("/")}>BookMyYatra</button>
        <div className="flex">
          {auth == null ? (
            <div className="flex">
              
              <div
                className={`p-2 mr-2 text-sm  cursor-pointer px-5 ${
                  url.includes("Login") ? "" : ""
                }`}
                onClick={() => navigate("/Login")}
              >
                Login
              </div>
              <div
                className={`px-2  text-l cursor-pointer border-2 p-2 rounded-lg bg-blue-700 text-white text-sm px-5 ${
                  url.includes("Register") ? "" : ""
                }`}
                onClick={() => navigate("/Register")}
              >
                Sign Up
              </div>
            </div>
          ) : 
          <div className="ml-20">
            <UserDropDown/>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
