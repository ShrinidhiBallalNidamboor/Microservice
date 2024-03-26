import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthProvider";



const Login = () => {

  const { user, updateUser } = useAuth();
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      // Send login request with employee ID and password
      const loginRes = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empID, Password: password })
      });

      if (loginRes.status === 200) {
        setShowVerificationModal(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  const handleVerify = async () => {
    try {
      // Verify the code with backend
      const verifyRes = await fetch("http://localhost:9000/verify2fa", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empID, verificationCode })
      });

      if (verifyRes.status === 200) {
        const data = await verifyRes.json();
        updateUser(data);
        console.log("User logged in successfully:", data);
        navigate('/');
      } else {
        alert("Invalid verification code");
      }
    } catch (err) {
      console.error("Error during verification:", err);
    }
  };

  return (
    <div className="authentication">
      <div className="container">
        <div className="form active-form" id="loginForm">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Employee ID" value={empID} onChange={(e) => setEmpID(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
          <div className="center mt-4">
            <span>Do not have an account? </span>
            <Link to='/register'>Register</Link>
          </div>
        </div>
      </div>

      {/* Verification modal */}
      {showVerificationModal && (


        (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enter Verification Code</h5>

                </div>
                <div className="modal-body text-left">

                  <div className="form-group mb-3">
                    <input type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />

                  </div>

                </div>
                <div className="modal-footer">
                  <button onClick={handleVerify}>Verify</button>
                  <button onClick={() => setShowVerificationModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Backdrop */}
      {showVerificationModal && <div className="backdrop" onClick={() => setShowVerificationModal(false)}></div>}
    </div>
  );
}



export default Login;


