import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="grid justify-center w-[100%] content-center mt-[10%]">
      <div className="grid">
        <label className="font-bold text-gray-500 pb-3">Enter Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 rounded border  border-2 px-2 border-gray-200 focus:bg-white focus:border-cyan-500 focus:outline-none   w-[400px] py-2"
        />
      </div>
      <div className="grid mt-3">
        <label className="font-bold text-gray-500 pb-3">Enter Password</label>
        <input
          className="bg-gray-200 rounded border  border-2 px-2 border-gray-200 focus:bg-white focus:border-cyan-500 focus:outline-none   w-[400px] py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="px-10 py-2 bg-sky-500 rounded mt-5 text-white font-bold">Sign in</button>
    </div>
  );
}

export default LoginForm;
