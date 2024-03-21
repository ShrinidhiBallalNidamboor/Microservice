// Sprintstats.js

import React, { useState } from 'react';
import FeatureMenu from './FeatureMenu';
import TeamProgress from './Features/TeamProgress';
import MemberProgress from './Features/MemberProgress';
import TaskAging from './Features/TaskAging';
import TaskStatus from './Features/TaskStatus';

import './../../css/sprintpage-css.css';

const Sprintstats = ({ barChartData, pieChartData, statsData }) => {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const renderFeature = () => {
        switch (selectedFeature) {
            default:
                return <TaskStatus pieChartData={pieChartData} />;
            case 'taskAging':
                return <TaskAging barChartData={barChartData} />;
            case 'teamProgress':
                return <TeamProgress teamPoints={statsData.teamStats} />;
            case 'memberProgress':
                return <MemberProgress memberPoints={statsData.memberStatsMap} />;
        }
    };

    return (
        <div className="sprint-stats-container">
            <FeatureMenu onSelectFeature={setSelectedFeature} selectedFeature={selectedFeature} />
            <div className="centered-content">
                {renderFeature()}
            </div>
        </div>
    );
};

export default Sprintstats;
