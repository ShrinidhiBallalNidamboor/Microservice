// Home.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom'; // Import Link
import ProjectSidebar from './ProjectSidebar';
import {Link} from "react-router-dom";

const ProjectMembers = () => {

    const { projectId } = useParams();

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects/" + projectId + "/members")
            .then((res) => res.json())
            .then((data) => { console.log(data); setMembers(data) });
    }, []);

    return (
        <div>
            <Navbar active="projects" />
            <div className="row">
                <div className="col-2">
                    <ProjectSidebar active="team" projectId={projectId}></ProjectSidebar>
                </div>
                <div className="col p-4">
                    <h2 className="my-3">Team</h2>
                    <Link to={`/projects/${projectId}/members/new`} className="mb-2">
                    <button className="btn btn-primary my-3">
                        Add member
                    </button>
                    </Link>                   
                    
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>

                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => {
                                return (
                                    <tr>
                                        <th scope="row">{member.user_id}</th>
                                        <td>{member.name}</td>
                                        <td>{member.role}</td>

                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default ProjectMembers;
