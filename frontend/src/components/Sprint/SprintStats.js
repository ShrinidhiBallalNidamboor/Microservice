import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './../../css/sprintpage-css.css';

const Sprintstats = ({ barChartData, pieChartData, statsData }) => {

    const renderTeamProgressBars = () => {
        const teamPoints = statsData?.teamStats;

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

    const renderMemberProgressBars = () => {
        const memberPoints = statsData?.memberStatsMap;

        if (!memberPoints || Object.keys(memberPoints).length === 0) {
            return <div className="progress-container">Member-wise Points Progress: N/A</div>;
        }

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

    return (
        <div className="chart-container">
            <div className="chart-row">
                <div className="chart-section">
                    <h2>Task Status Breakdown</h2>
                    <Bar data={barChartData} options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }} />
                </div>
                <div className="chart-section">
                    <h2>Project Health Indicator</h2>
                    <Pie data={pieChartData} />
                </div>
            </div>
            {renderTeamProgressBars()}
            {renderMemberProgressBars()}
        </div>
    );
};

export default Sprintstats;
