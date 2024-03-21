// TeamProgress.js

import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TeamProgress = ({ teamPoints }) => {

    const renderBars = (points, label) => {
        return (
            <div key={label} className="progress-container">
                <p>{`${label}'s Progress: ${(points.donePoints / points.totalPoints * 100 || 0).toFixed(2)}%`}</p>
                <ProgressBar striped variant={getVariant(points.donePoints, points.totalPoints)} now={(points.donePoints / points.totalPoints * 100 || 0)} />
            </div>
        );
    };

    const getVariant = (done, total) => {
        const percentage = (done / total) * 100 || 0;

        if (percentage < 25) {
            return 'danger';
        } else if (percentage < 50) {
            return 'warning';
        } else {
            return 'success';
        }
    };

    if (!teamPoints) {
        return <div className="progress-container">Team Points Progress: N/A</div>;
    }

    return (
        <div className="progress-container">
            <h2>Team Points Progress</h2>
            {renderBars(teamPoints, 'Team')}
        </div>
    );


};

export default TeamProgress;
