import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './../../css/sprintpage-css.css';

const Sprintstats = ({ barChartData, pieChartData, issues }) => {
    const renderTeamProgressBars = () => {
        const teamPoints = {};

        issues.forEach((issue) => {
            if (issue.status === 'DONE') {
                if (!teamPoints.team) {
                    teamPoints.team = { done: 0, total: 0 };
                }
                teamPoints.team.done += issue.storyPoints;
            }

            if (!teamPoints.team) {
                teamPoints.team = { done: 0, total: 0 };
            }
            teamPoints.team.total += issue.storyPoints;
        });

        return (
            <div className="progress-container">
                <h2>Team Points Progress</h2>
                {renderBars(teamPoints.team, 'Team')}
            </div>
        );
    };

    const renderMemberProgressBars = () => {
        const memberPoints = {};

        issues.forEach((issue) => {
            if (issue.status === 'DONE') {
                if (!memberPoints[issue.creator]) {
                    memberPoints[issue.creator] = { done: 0, total: 0 };
                }
                memberPoints[issue.creator].done += issue.storyPoints;
            }

            if (!memberPoints[issue.creator]) {
                memberPoints[issue.creator] = { done: 0, total: 0 };
            }
            memberPoints[issue.creator].total += issue.storyPoints;
        });

        return (
            <div className="progress-container">
                <h2>Member-wise Points Progress</h2>
                {Object.keys(memberPoints).map((member) => (
                    <div key={member} className="progress-container">
                        <p>{`${member}'s Progress: ${(memberPoints[member].done / memberPoints[member].total * 100 || 0).toFixed(2)}%`}</p>
                        <ProgressBar striped variant={getVariant(memberPoints[member].done, memberPoints[member].total)} now={(memberPoints[member].done / memberPoints[member].total * 100 || 0)} />
                    </div>
                ))}
            </div>
        );
    };

    const renderBars = (points, label) => {
        return (
            <div key={label} className="progress-container">
                <p>{`${label}'s Progress: ${(points.done / points.total * 100 || 0).toFixed(2)}%`}</p>
                <ProgressBar striped variant={getVariant(points.done, points.total)} now={(points.done / points.total * 100 || 0)} />
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
