// BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';

const TaskAging = ({ barChartData }) => {
    return (
        <div className="chart-section">
            <h2>Task Age Breakdown (in days)</h2>
            <Bar data={barChartData} options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }} />
        </div>
    );
};

export default TaskAging;
