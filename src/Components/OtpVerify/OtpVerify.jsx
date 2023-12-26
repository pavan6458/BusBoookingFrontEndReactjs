import React from "react";
import apiUrl from "../../constants/projectConstants";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
  const phone = localStorage.getItem("phone");
  const navigator = useNavigate();
  const verifyOtp = () => {
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

    fetch(apiUrl + "api/user/public/otpVerify", requestOptions)
      .then((response) => {
        response.json();
        if (response.status == 200) {
          const authToken = response.headers.get("Authorization");
          localStorage.setItem("Authorization",authToken);
          console.log(authToken);
          navigator("/profile");
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-2xl">
                <p>Phone Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your phone {phone}</p>
              </div>
            </div>

            <div>
              <div action="">
                <div class="flex flex-col space-y-16">
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div class="w-12 h-12 ">
                      <input
                        class="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        maxLength={1}
                        id=""
                      />
                    </div>
                    <div class="w-12 h-12 ">
                      <input
                        class="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                      />
                    </div>
                    <div class="w-12 h-12 ">
                      <input
                        class="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                      />
                    </div>
                    <div class="w-12 h-12 ">
                      <input
                        class="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        maxLength={1}
                        id=""
                      />
                    </div>
                  </div>

                  <div class="flex flex-col space-y-5">
                    <div className="flex justify-center">
                      <button
                        class="flex flex-row items-center justify-center text-center w-[80%] border rounded-xl outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={verifyOtp}
                      >
                        Verify Account
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        class="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
