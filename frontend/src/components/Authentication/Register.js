import React from "react";
import '../../css/login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        fetch("http://localhost:9000/register",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    empID: document.getElementById('empID').value,
                    organisationName: document.getElementById('organisationName').value,
                    Password: document.getElementById('registerPassword').value,
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                })
            })
            .then(res => {
                if (res.status == 201) {
                    alert("Registered successfully");
                    navigate('/login');
                }
                else {
                    alert('Registration Failed');
                }
            })
            .catch(err => {
                console.log("Error during login ", err);
            })
    }
    return (

        <div className="authentication">

            <div class="container">
                {/* <h1><b>Oauth 2.0</b></h1> */}
                <div class="form active-form" id="registerForm">
                    <h2>Register</h2>
                    <form>
                        <input type="text" id="empID" placeholder="Employee ID" name="empID" required />
                        <input type="text" id="organisationName" placeholder="Name of Organisation" name="organisationName" required />
                        <input type="text" id="name" placeholder="User name" name="name" required />
                        <input type="text" id="email" placeholder="Email" name="email" required />
                        <input type="password" id="registerPassword" placeholder="Password" name="Password" required />
                        <button type="button" onClick={handleSubmit}>Register</button>
                    </form>
                    <div className="center mt-4">
                        <span>Already have an account? </span>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Register;