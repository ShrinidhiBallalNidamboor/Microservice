// Home.js

import React from 'react';
import Navbar from '../Navbar';
import ProjectSidebar from './ProjectSidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthProvider';

const AddProject = () => {

    const navigate = useNavigate();
    const {user} = useAuth();

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");    

    const handleSubmit = () => {
        fetch(`http://localhost:9000/projects?organization_id=${user.orgId}`, // TODO
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify(
                    {      
                        name: name,
                        description: description
                    }
                )
            })
            .then(res => {
                console.log(res);
                if(res.status != 201){
                    alert("Error while adding project");
                    console.log(res);
                }
                else{
                    alert("Project added");
                    navigate('/projects');
                }
            })
            .catch(err => {
                alert("Error while adding project");
                console.log(err);
            })
    }

    return (
        <div>
            <Navbar active="projects" />
            <div className="row mx-5 justify-content-center">
                <div className="col-6 py-3 px-2">

                    <h2>Add New Project</h2>
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
                        <label htmlFor="description" className='mb-2'>Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>


                    <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
}

export default AddProject;
