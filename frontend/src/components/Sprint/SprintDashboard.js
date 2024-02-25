// SprintDashboard.js

import React from 'react';
import SprintDetails from './SprintDetails';
import Navbar from '../Navbar';
import './../../css/sprint-css.css';

const SprintDashboard = () => {
    const sprints = [
        { id: 1, name: 'Sprint 1', startDate: '2024-02-01', endDate: '2024-02-14' },
        { id: 2, name: 'Sprint 2', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 3, name: 'Sprint 3', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 4, name: 'Sprint 4', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 5, name: 'Sprint 5', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 6, name: 'Sprint 6', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 7, name: 'Sprint 7', startDate: '2024-02-15', endDate: '2024-02-28' },
        { id: 8, name: 'Sprint 8', startDate: '2024-02-15', endDate: '2024-02-28' },
        // Add more sprint details as needed
    ];

    // const SprintDetailsList = ({ sprints }) => (
    //     <div>
    //         {sprints.map(sprint => (
    //             <SprintDetails key={sprint.id} sprint={sprint} />
    //         ))}
    //     </div>
    // );

    return (
        <div className='sprint-dashboard'>
            <Navbar active="projects" />
            <h1>Sprint Dashboard</h1>
            <div>
                {sprints.map(sprint => (
                    <SprintDetails key={sprint.id} sprint={sprint} />
                ))}
            </div>

        </div>

    );
}



export default SprintDashboard;
