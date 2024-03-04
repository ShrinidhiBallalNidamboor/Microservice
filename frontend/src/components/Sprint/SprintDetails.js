import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/sprint-css.css';

const SprintDetails = ({ sprint }) => {
    const formatDateTime = (dateTimeString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        // Explicitly set the format to ISO 8601
        const formattedDate = new Date(dateTimeString.replace(' ', 'T')).toLocaleString(undefined, options);

        return formattedDate;
    };

    return (
        <div className="sprint-details">
            <Link to={`/sprint/${sprint.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>{sprint.status}</h2>
                <p>Start Date: {formatDateTime(sprint.startDate)}</p>
                <p>End Date: {formatDateTime(sprint.endDate)}</p>
                {/* Add more details as needed */}
            </Link>
        </div>
    );
}

export default SprintDetails;
