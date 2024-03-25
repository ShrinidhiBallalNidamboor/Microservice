import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ProjectSidebar from "./ProjectSidebar";
import '../../css/sprint.css';
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
// Sprint dashboard component
const Backlog = () => {

    const {user} = useAuth();
    const [issues, setIssues] = useState([]);
    const { projectId, sprintId } = useParams();

    const [selectedIssue, setSelectedIssue] = useState(null);
    const [notification, setNotification] = useState(null);    

    useEffect(() => {
        
        fetch("http://localhost:9000/projects/" + projectId + "/backlog", {
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIssues(data);
            })
    }, [])

    const handleIssueClick = (issue) => {
        console.log("Selected ", issue);
        setSelectedIssue(issue);
    }

    const handleDelete = () => {
        fetch(`http://localhost:9000/projects/${projectId}/sprints/${sprintId}/issues/${selectedIssue.id}`, {
            method: "DELETE", 
            headers : {
                'Authorization': 'Bearer ' + user.token
            }
        }).then(res => {
            deleteIssue(selectedIssue);            
            handleCloseModal();
            setNotification({ type: 'success', message: 'Issue deleted successfully' });
            setTimeout(() => {
                setNotification(null);
              }, 3000);
        }).catch(err => {
            alert("Error while deleting issue");
            console.log(err);
            handleCloseModal();
            setNotification({ type: 'error', message: 'Failed to delete issue' });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
        })
    }

    const handleEdit = () => {
        fetch(`http://localhost:9000/projects/${projectId}/sprints/${sprintId}/issues`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                issue: {
                    id: selectedIssue.id,
                    description: selectedIssue.description,
                    status: selectedIssue.status,
                    points: selectedIssue.points
                },
            })
        }).then(res => {
            updateIssue(selectedIssue);
            
            handleCloseModal();
            setNotification({ type: 'success', message: 'Issue updated successfully' });
            setTimeout(() => {
                setNotification(null);
              }, 3000);
        }).catch(err => {
            alert("Error while updating issue");
            console.log(err);
            handleCloseModal();
            setNotification({ type: 'error', message: 'Failed to update issue' });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
        })
    };

    const handleCloseModal = () => {
        setSelectedIssue(null);
        console.log("set null");
    };

    const showIssue = (issue) => {
        return (
            <Link key={issue.id} onClick={() => handleIssueClick(issue)} style={{ textDecoration: 'none', color: 'inherit'}}>
                <div className="p-3 bg-light my-1 mx-1 issue">
                    <h5 className="issue-desc">{issue.description}</h5>
                    <div className="issue-creator">{issue.owner_name}</div>
                </div>
            </Link>
        )
    }

    const updateIssue = (updatedIssue) => {
        console.log("Updating ", updatedIssue);
        setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
        console.log(issues);
    }
    const deleteIssue = (updatedIssue) => {
        console.log("Deleting ", updatedIssue);
        setIssues(issues.filter(issue => issue.id !== updatedIssue.id));
        console.log(issues);
    }

    return (
        <div>
            <Navbar active="projects"></Navbar>
            <div className="row">
                <div className="col-2">
                    <ProjectSidebar active="backlog" projectId={projectId}></ProjectSidebar>
                </div>
                <div className="col p-4">
                    <h3 className="mb-3">Backlog</h3>

                    <div className="dashboard row center mx-1">
                        <div className="col todo issue-status">
                            <h6 className="bg-dark status-type p-3">Todo</h6>
                            {issues.map(issue => {
                                return issue.status == "TODO" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col in-progress issue-status">
                            <h6 className="bg-warning status-type p-3">In Progress</h6>
                            {issues.map(issue => {
                                return issue.status == "IN_PROGRESS" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col blocked issue-status">
                            <h6 className="bg-danger status-type p-3">Blocked</h6>
                            {issues.map(issue => {
                                return issue.status == "BLOCKED" ? showIssue(issue) : "";
                            })}
                        </div>
                        <div className="col completed issue-status">
                            <h6 className="bg-success status-type p-3">Completed</h6>
                            {issues.map(issue => {
                                return issue.status == "DONE" ? showIssue(issue) : "";
                            })}
                        </div>

                    </div>
                    {selectedIssue && (
                        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content" >
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Issue</h5>
                                        {/* <button type="button" className="close" onClick={handleCloseModal}>
                                        <span>&times;</span>
                                    </button> */}
                                    </div>
                                    <div className="modal-body text-left">

                                        <div className="form-group mb-3">
                                            <label htmlFor="description" className='mb-2'>Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                value={selectedIssue.description}
                                                required
                                                onChange={(e) => setSelectedIssue((state) => {return ({...state, description: e.target.value})})}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="status" className='mb-2'>Status</label>
                                            <select
                                                
                                                className="form-control"
                                                id="status"onChange={(e) => setSelectedIssue((state) => {return ({...state, status: e.target.value})})}
                                            >
                                                <option value="TODO" selected={selectedIssue.status == "TODO"}>Todo</option>
                                                <option value="IN_PROGRESS" selected={selectedIssue.status == "IN_PROGRESS"}>In Progress</option>
                                                <option value="BLOCKED" selected={selectedIssue.status == "BLOCKED"}>Blocked</option>
                                                <option value="DONE" selected={selectedIssue.status == "DONE"}>Done</option>

                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="points" className='mb-2'>Points</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="points"
                                                value={selectedIssue.points}
                                                required
                                                onChange={(e) => setSelectedIssue((state) => {return ({...state, points: e.target.value})})}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                            Delete
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={handleEdit}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {issues.length == 0 ?
                        <h5 className="center mt-5">
                            No issues have been added to this sprint
                        </h5>
                        : ""}
                </div>
            </div>
            
            {notification && (
                <div className={`notification text-white ${notification.type == 'success' ? "bg-success": "bg-dander"}`}>
                {notification.message}
                </div>
            )}
        </div>
    )
}

export default Backlog;