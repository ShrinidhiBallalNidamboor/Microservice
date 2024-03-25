// Home.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate, useParams } from 'react-router-dom'; // Import Link
import ProjectSidebar from './ProjectSidebar';
import {Link} from "react-router-dom";
import { useAuth } from "../AuthProvider";

const ProjectMembers = () => {

    const {user} = useAuth();
    const { projectId } = useParams();
    const [isOwner, setIsOwner] = useState(user.role == "OWNER");
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    const [members, setMembers] = useState([]);

    const fetchRole = () => {
        fetch(`http://localhost:9000/projects/${projectId}/role?userId=${user.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        .then(res => {
            if(res.status == 401){
                navigate('/login')
            }
            return res.json();
        }) 
        .then(data => {
            console.log(data);
            console.log(data);
            setUserRole(data.role);
        })
    }
    useEffect(() => {
        fetch("http://localhost:9000/projects/" + projectId + "/members",{
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((res) => {
                if(res.status != 200){
                    navigate('/login');
                }
                return res.json();
            })
            .then((data) => { 
                console.log(data); setMembers(data);
                data.map(member => {
                    if(member.user_id == user.empId && member.role == "LEAD"){
                        setIsOwner(true);
                    }
                });
            });
        fetchRole();
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
                    {isOwner || userRole == "LEAD" ? 
                    <Link to={`/projects/${projectId}/members/new`} className="mb-2">
                    <button className="btn btn-primary my-3">
                        Add member
                    </button>
                    </Link>    
                    : ""}               
                    
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
