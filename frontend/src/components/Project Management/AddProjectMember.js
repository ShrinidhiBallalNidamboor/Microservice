// Home.js

import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import ProjectSidebar from './ProjectSidebar';
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const AddProjectMember = () => {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const {user} = useAuth();

    const handleRoleChange = (e) => setRole(e);

    const handleSubmit = () => {
        fetch("http://localhost:9000/projects/" + projectId + "/members",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({
                    member: {
                        user_id: userId,
                        name: name,
                        role: role
                    }
                })
            })
            .then(res => {
                if(res.status != 201){
                    alert("Error " + res.statusText);
                }
                else
                    navigate('/projects/' + projectId + '/members');
            })
    }
    return (
        <div>
            <Navbar active="projects" />
            <div className="row flex-grow-1">
                <div className="col-2">
                    <ProjectSidebar active="team" projectId={projectId}></ProjectSidebar>

                </div>
                <div className="col py-3 px-2">

                    <h2>Add New Member</h2>
                    <div className="form-group my-3">
                        <label htmlFor="startDate" className='mb-2'>Employee Id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="startDate" className='mb-2'>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div class="form-group mb-3">
                        <label for="role">Role</label><br />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" checked={role === "LEAD"} name="role" id="lead" value="LEAD" onChange={() => handleRoleChange("LEAD")} />
                            <label class="form-check-label" for="lead">Lead</label>
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

export default AddProjectMember;
