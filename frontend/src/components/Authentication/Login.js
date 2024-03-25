import React, { useState } from "react";
import '../../css/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'
import { useAuth } from "../AuthProvider";

const Login = () => {

  const { user, updateUser } = useAuth();
  const [empID, setEmpID] = useState("");  
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log(empID, password);
      const res = await fetch("http://localhost:9000/login",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            empID: empID,
            Password: password,
          })
        });
      console.log(res);
      if (res.status == 401) {
        alert("Invalid credentials");
      }
      else if (res.status != 200) {
        alert("Cannot connect to server");
      }
      else {
        const data = await res.json();
        console.log(data);
        updateUser(data);
        navigate('/');
      }
    } catch (err) {
      console.log("Error during login ", err);
    }
  }
  return (
    <div className="authentication">
      <div class="container">
        {/* <h1><b>Oauth 2.0</b></h1> */}

        <div class="form active-form" id="loginForm">
          <h2>Login</h2>
          <form>
            <input type="text" id="empID" placeholder="Employee ID" name="empID" required onChange={(e) => setEmpID(e.target.value)}/>
            <input type="password" id="loginPassword" placeholder="Password" name="Password" required onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={handleSubmit}>Login</button>
          </form>
          <div className="center mt-4">
            <span>Do not have an account? </span>
            <Link to='/register'>Register</Link>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Login;