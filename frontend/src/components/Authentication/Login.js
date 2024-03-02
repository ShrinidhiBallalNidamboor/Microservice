import React from "react";
import '../../css/login.css';
import {Link, useNavigate} from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'

const Login = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const handleSubmit = () => {
        fetch("http://localhost:8000/login",
        {
            method: "POST",
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                empID: document.getElementById('empID').value,
                Password: document.getElementById('loginPassword').value,
            })
        })
        .then(res => res.json())
        .then (data => {
            console.log(data.data);
            setCookie('token', data.data)
            navigate('/');
        })
        .catch(err => {
            console.log("Error during login ", err);
        })
    }
    return (

<div class="container">
  <h1><b>Oauth 2.0</b></h1>

  <div class="form active-form" id="loginForm">
    <h2>Login</h2>
    <form>
      <input type="text" id="empID" placeholder="Employee ID" name="empID" required/>
      <input type="password" id="loginPassword" placeholder="Password" name= "Password" required/>
      <button type="button" onClick={handleSubmit}>Login</button>
    </form>
  </div>
</div>

    );
}

export default Login;