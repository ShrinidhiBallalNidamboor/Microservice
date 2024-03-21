import React, { useEffect, useState } from 'react';
import SprintDetails from './SprintDetails';
import Navbar from '../Navbar';
import './../../css/sprint-css.css';

const SprintDashboard = () => {
    const [sprints, setSprints] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8082/sprints')
            .then(response => response.json())
            .then(data => setSprints(data))
            .catch(error => console.error('Error fetching sprints:', error));
    }, []);

    return (
        <div className='sprint-dashboard'>
            <Navbar active="projects" />
            <h1>Sprint Dashboard</h1>
            <div>
                {sprints && sprints.map(sprint => (
                    <SprintDetails key={sprint.id} sprint={sprint} />
                ))}
            </div>
        </div>
    );
}

export default SprintDashboard;
