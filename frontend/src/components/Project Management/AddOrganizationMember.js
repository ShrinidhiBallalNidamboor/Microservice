// Home.js

import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import ProjectSidebar from './ProjectSidebar';
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const AddOrganizationMember = () => {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useAuth();

    const handleRoleChange = (e) => { setRole(e); console.log(e); };

    const handleSubmit = () => {
        fetch(`http://localhost:9000/organizations/${user.orgId}`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({
                    user: {
                        empId: userId,
                        password: password,
                        name: name,
                        orgName: user.orgName,
                        email: email,
                        role: role
                    }
                })
            })
            .then(res => {
                if (res.status != 201) {
                    alert("Error adding member");
                }
                else {
                    alert("User added successfully");
                    navigate('/projects');
                }
            })
    }
    return (
        <div>
            <Navbar active="projects" />
            <div className="row flex-grow-1 p-5 justify-content-center">
                <div className="col-6 py-3 px-2">

                    <h2>Add New Member</h2>
                    <div className="form-group my-3">
                        <label htmlFor="userId" className='mb-2'>Employee Id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="password" className='mb-2'>Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="form-group my-3">
                        <label htmlFor="name" className='mb-2'>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="startDate" className='mb-2'>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div class="form-group mb-3">
                        <label for="role">Role</label><br />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" checked={role === "OWNER"} name="role" id="owner" value="OWNER" onChange={() => handleRoleChange("OWNER")} />
                            <label class="form-check-label" for="owner">Owner</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" checked={role === "MEMBER"} name="role" id="member" value="MEMBER" onChange={() => handleRoleChange("MEMBER")} />
                            <label class="form-check-label" for="member">Member</label>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
}

export default AddOrganizationMember;
