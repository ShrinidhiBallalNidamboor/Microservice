// Home.js


import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';

const Project = () => {

    const { projectId } = useParams();
    const [sprints, setSprints] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState('');


    useEffect(() => {
        fetch("http://localhost:4000/projects/" + projectId + "/sprints")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSprints(data);
            })
    }, [sprints]);

    const handleCreateSprint = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {

        fetch("http://localhost:4000/projects/" + projectId + "/sprints",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "sprint": {
                        "start_date": startDate,
                        "duration": duration,
                    },
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSprints([...sprints, data])
            }).catch(err => alert("Error adding sprint ", err));
        // Close the modal after saving
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCompleteSprint = (id) => {
        fetch(`http://localhost:4000/projects/${projectId}/sprints/${id}/complete`,
            {
                method: "PUT"
            })
            .then(res => {
                setSprints(sprints);
            }).catch(err => alert("Error adding sprint ", err));
    }

    return (
        <div>
            <Navbar active="projects" />
            <div className="row">
                <div className="col-2">
                    <ProjectSidebar active="sprints" projectId={projectId}></ProjectSidebar>
                </div>
                <div className="col p-4">
                    <div className='sprint-dashboard'>
                        <h2>Sprints</h2>
                        <div>
                            <button className="btn btn-primary mt-2" onClick={handleCreateSprint}>
                                Create Sprint
                            </button>
                            {showModal && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Create Sprint</h5>
                                                {/* <button type="button" className="close" onClick={handleCloseModal}>
                                        <span>&times;</span>
                                    </button> */}
                                            </div>
                                            <div className="modal-body text-left">

                                                <div className="form-group mb-3">
                                                    <label htmlFor="startDate" className='mb-2'>Start Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="startDate"
                                                        value={startDate}
                                                        required
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="duration" className='mb-2'>Duration (in weeks)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="duration"
                                                        value={duration}
                                                        required
                                                        onChange={(e) => setDuration(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                                    Close
                                                </button>
                                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='my-3'>
                                {sprints.map((sprint, index) => {
                                    return (
                                        <div className='sprint-details center'>
                                            <Link to={`/projects/${projectId}/sprints/${sprint.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <h4>Sprint {index + 1}</h4>
                                                <div className='my-2'>Start Date: {sprint.start_date.split("T")[0]}</div>
                                                {
                                                    sprint.end_date ?
                                                        <div className='my-2'>End Date: {sprint.end_date.split("T")[0]}</div> : ""
                                                }


                                            </Link>
                                            {
                                                sprint.status == "Ongoing" ?
                                                    <button className='mt-2 btn btn-success' onClick={(e) => {e.stopPropagation(); handleCompleteSprint(sprint.id)}}>Complete</button> : ""
                                            }


                                        </div>
                                    )
                                })}
                            </div>

                            {/* <table className="table table-bordered my-4">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Sprint</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Duration</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sprints.map((sprint, index) => {
                                        return (
                                            <tr className={sprint.status == "Ongoing" ? "bg-success text-white" : ""}>


                                                <td>{index + 1}</td>
                                                <td>{sprint.start_date.split("T")[0]}</td>
                                                <td>{sprint.end_date ? sprint.end_date.split("T")[0] : ""}</td>
                                                <td>{sprint.duration} weeks</td>
                                                <td>{sprint.status}</td>

                                            </tr>

                                        );
                                    })}

                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Project;
