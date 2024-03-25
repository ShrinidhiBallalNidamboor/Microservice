// Home.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { useAuth } from '../AuthProvider';

const Projects = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        console.log(user.role);
        fetch(`http://localhost:9000/projects?organization_id=${user.orgId}`, {

            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((res) => {
                if (res.status == 401) {
                    alert("Session expired, please login");
                    navigate('/login');
                }
                return res.json();
            })
            .then((data) => { console.log(data); setProjects(data) });
    }, []);

    return (
        <div>
            <Navbar active="projects" />
            <div class="container pt-5 pb-5">
                <div className="row">
                    <div className="col-6">
                        <h1 className="mb-4">Projects</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                    {user.role.toUpperCase() === "OWNER" ?
                            <div>
                                <Link to="/projects/new"><button className='btn btn-primary'>Add Project</button></Link>
                                <Link to="/organization/members/new"><button className='btn btn-primary mx-3'>Add Organization Member</button></Link>

                            </div>: 
                    ""}
                    </div>
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Project ID</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Project Description</th>
                            <th scope="col" className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => {
                            return (<tr key={project.id}>
                                <td scope="row">{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.description}</td>
                                <td className="text-end">
                                    <Link to={"/projects/" + project.id}>
                                        <button className="btn btn-secondary btn-small mt-1 mb-1 mx-1">View</button>
                                    </Link>
                                    {user.role.toUpperCase() === "OWNER" ?
                                        <Link to={"/projects/" + project.id + "/edit"}>
                                            <button className="btn btn-secondary btn-small mt-1 mb-1">Edit</button>
                                        </Link> : ""
                                    }
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default Projects;
