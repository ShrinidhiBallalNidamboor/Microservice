// MemberProgress.js

import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const MemberProgress = ({ memberPoints }) => {


    if (!memberPoints || Object.keys(memberPoints).length === 0) {
        return <div className="progress-container">Member-wise Points Progress: N/A</div>;
    }


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

    return (
        <div className="progress-container">
            <h2>Member-wise Points Progress</h2>
            {Object.keys(memberPoints).map((member) => (
                <div key={member} className="progress-container">
                    <p>{`${member}'s Progress: ${(memberPoints[member].donePoints / memberPoints[member].totalPoints * 100 || 0).toFixed(2)}%`}</p>
                    <ProgressBar striped variant={getVariant(memberPoints[member].donePoints, memberPoints[member].totalPoints)} now={(memberPoints[member].donePoints / memberPoints[member].totalPoints * 100 || 0)} />
                </div>
            ))}
        </div>
    );

};

export default MemberProgress;
