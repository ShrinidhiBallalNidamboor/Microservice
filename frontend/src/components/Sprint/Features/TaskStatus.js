// PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';

const TaskStatus = ({ pieChartData }) => {
    return (
        <div className="chart-section">
            <h2>Project Health Indicator</h2>
            <Pie data={pieChartData} />
        </div>
    );
};

export default TaskStatus;
