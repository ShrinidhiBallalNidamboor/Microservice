import React from "react";
import '../../css/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'

const Login = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:9000/login",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            empID: document.getElementById('empID').value,
            Password: document.getElementById('loginPassword').value,
          })
        });
      if (res.status == 401) {
        alert("Invalid credentials");
      }
      else if (res.status != 200) {
        alert("Cannot connect to server");
      }
      else {
        const data = await res.json();
        console.log(data.data);
        setCookie('token', data.data)
        navigate('/');
      }
    } catch (err) {
      console.log("Error during login ", err);
    }
  }
  return (
    <div className="authentication">
      <div class="container">
        <h1><b>Oauth 2.0</b></h1>

        <div class="form active-form" id="loginForm">
          <h2>Login</h2>
          <form>
            <input type="text" id="empID" placeholder="Employee ID" name="empID" required />
            <input type="password" id="loginPassword" placeholder="Password" name="Password" required />
            <button type="button" onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>

    </div>

  );
}

export default Login;