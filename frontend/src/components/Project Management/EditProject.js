// Home.js

import React from 'react';
import Navbar from '../Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from "../AuthProvider";

const EditProject = () => {

    const navigate = useNavigate();
    const {user} = useAuth();

    const {projectId} = useParams();

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");    

    useEffect(() => {
        fetch(`http://localhost:9000/projects/${projectId}`, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setName(data.name);
            setDescription(data.description);
        })
        .catch(err => {
            alert("Error fetching project details");
        })
    }, [])

    const handleSubmit = () => {
        fetch(`http://localhost:9000/projects/${projectId}`, // TODO
            {
                method: "PUT",
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
                if(res.status != 200){
                    alert("Error while updating project");
                    console.log(res);
                }
                else{
                    alert("Project updated");
                    navigate('/projects');
                }
            })
            .catch(err => {
                alert("Error while updating project");
                console.log(err);
            })
    }

    return (
        <div>
            <Navbar active="projects" />
            <div className="row mx-5">
                <div className="col py-3 px-2">

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

export default EditProject;
