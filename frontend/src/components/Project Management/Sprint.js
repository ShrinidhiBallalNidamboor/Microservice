import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ProjectSidebar from "./ProjectSidebar";
import '../../css/sprint.css';
import { Link } from "react-router-dom";

// Sprint dashboard component
const Sprint = () => {

    const [issues, setIssues] = useState([]);
    const { projectId, sprintId } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch("http://localhost:4000/projects/" + projectId + "/sprints/" + sprintId + "/issues")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIssues(data);
            })
    }, [])

    const showIssue = (issue) => {
        return (
            <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="p-3 bg-light my-1 mx-1">
                    <h5 className="issue-desc">{issue.description}</h5>
                    <div className="issue-creator">{issue.owner_name}</div>
                </div>
            </Link>
        )
    }

    const handleCreateIssue = () => setShowModal(true);

    return (
        <div>
            <Navbar active="projects"></Navbar>
            <div className="row">
                <div className="col-2">
                    <ProjectSidebar active="team" projectId={projectId}></ProjectSidebar>
                </div>
                <div className="col p-4">
                    <h3>Sprint dashboard</h3>
                    <Link to={`/projects/${projectId}/sprints/${sprintId}/issues/new`}>
                        <button className="btn btn-primary my-3" onClick={handleCreateIssue}>
                            Create Issue
                        </button>
                    </Link>
                    
                    <div className="dashboard row center mx-1">
                        <div className="col todo issue-status">
                            <h4 className="bg-dark text-white p-2">Todo</h4>
                            {issues.map(issue => {
                                return issue.status == "TODO" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col in-progress issue-status">
                            <h4 className="bg-warning text-white p-2">In Progress</h4>
                            {issues.map(issue => {
                                return issue.status == "IN_PROGRESS" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col blocked issue-status">
                            <h4 className="bg-danger text-white p-2">Blocked</h4>
                            {issues.map(issue => {
                                return issue.status == "BLOCKED" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col completed issue-status">
                            <h4 className="bg-success text-white p-2">Completed</h4>
                            {issues.map(issue => {
                                return issue.status == "DONE" ? showIssue(issue) : "";
                            })}
                        </div>

                    </div>
                    {issues.length == 0 ?
                        <h5 className="center mt-5">
                            No issues have been added to this sprint
                        </h5>
                        : ""}
                </div>
            </div>
        </div>
    )
}

export default Sprint;