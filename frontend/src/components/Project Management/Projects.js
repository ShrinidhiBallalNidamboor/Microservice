// Home.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom'; // Import Link
import axios from 'axios';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects?organization_id=1")
            .then((res) => res.json())
            .then((data) => { setProjects(data) });
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
                        <Link to="/projects/new"><button className='btn btn-primary'>Add Project</button></Link>
                    </div>
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Project ID</th>
                            <th scope="col">Project Name</th>
                            <th scope="col" className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => {
                            return (<tr key={project.id}>
                                <td scope="row">{project.id}</td>
                                <td>{project.description}</td>
                                <td className="text-end">
                                    <Link to={"/projects/" + project.id}>
                                        <button className="btn btn-secondary btn-small mt-1 mb-1 mx-1">View</button>
                                    </Link>
                                    <Link to={"/projects/" + project.id}>
                                        <button className="btn btn-secondary btn-small mt-1 mb-1">Edit</button>
                                    </Link>
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
