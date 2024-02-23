// SprintDetails.js

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './../../css/sprint-css.css';
import SprintPage from './SprintPage';

const SprintDetails = ({ sprint }) => {
    return (
        <div className="sprint-details">
            <Link to={`/sprint/${sprint.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>{sprint.name}</h2>
                <p>Start Date: {sprint.startDate}</p>
                <p>End Date: {sprint.endDate}</p>
                {/* Add more details as needed */}
            </Link>

        </div>

    );
}

export default SprintDetails;
