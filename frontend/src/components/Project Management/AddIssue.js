// Home.js

import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import ProjectSidebar from './ProjectSidebar';
import { useParams } from "react-router-dom";

const AddIssue = () => {

    const { projectId, sprintId } = useParams();
    const  navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [points, setPoints] = useState("");

    const handleSubmit = () => {
        fetch("http://localhost:4000/projects/" + projectId + "/sprints/" + sprintId + "/issues",
        {
            method: "POST",
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                issue : {
                    description : description,
                    points: points,
                    owner_name: "ABC",
                    owner_id: "ABC"
                }
            })
        })
        .then(res => {
            navigate('/projects/' + projectId + '/sprints/' + sprintId);
        })
        .catch(err => {
            alert("Error adding issue ", err);
        })
    }
    return (
        <div>
            <Navbar active="projects" />
            <div className="row ">
                <div className="col-2">
                    <ProjectSidebar active="sprints" projectId={projectId}></ProjectSidebar>
                </div>
                <div className="col p-4">

                    <h3>Add Issue</h3>
                    <div className="form-group my-3">
                        <label htmlFor="description" className='mb-2'>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="points" className='mb-2'>Points</label>
                        <input
                            type="number"
                            className="form-control"
                            id="points"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                        />
                    </div>
                    
                    <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
}

export default AddIssue;
