import React, { useState } from "react";
import Header from "../Header/Header";
import LoginForm from "./LoginForm";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <Header/>
      <LoginForm/>
     
    </div>
  );
}

export default Login;
