// FeatureMenu.js

import React, { useState } from 'react';
import './../../css/sprintpage-css.css'; // Import your CSS file

const FeatureMenu = ({ onSelectFeature }) => {
    const [activeFeature, setActiveFeature] = useState('taskStatus');

    const handleSelectFeature = (feature) => {
        onSelectFeature(feature);
        setActiveFeature(feature);
    };

    return (
        <div className="feature-menu">
            <button
                className={`button-stylish ${activeFeature === 'taskStatus' ? 'active' : ''}`}
                onClick={() => handleSelectFeature('taskStatus')}
            >
                Task Status
            </button>
            <button
                className={`button-stylish ${activeFeature === 'taskAging' ? 'active' : ''}`}
                onClick={() => handleSelectFeature('taskAging')}
            >
                Task Aging
            </button>
            <button
                className={`button-stylish ${activeFeature === 'teamProgress' ? 'active' : ''}`}
                onClick={() => handleSelectFeature('teamProgress')}
            >
                Team Progress
            </button>
            <button
                className={`button-stylish ${activeFeature === 'memberProgress' ? 'active' : ''}`}
                onClick={() => handleSelectFeature('memberProgress')}
            >
                Member Progress
            </button>
            {/* Add more buttons for other features */}
        </div>
    );
};

export default FeatureMenu;
