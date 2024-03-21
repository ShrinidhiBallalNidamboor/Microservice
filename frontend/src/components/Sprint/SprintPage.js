import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import Navbar from '../Navbar';
import './../../css/sprintpage-css.css';
import Sprintstats from './SprintStats';

Chart.register(CategoryScale);

const SprintPage = () => {
    const { id } = useParams();
    const [showStats, setShowStats] = useState(false);
    const [issues, setIssues] = useState([]);
    const [sprintDetails, setSprintDetails] = useState({});
    const [showLabel, setShowLabel] = useState("Show sprint statistics");
    const [statsData, setStatsData] = useState({});
    const [barChartData, setBarChartData] = useState({
        labels: ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE'],
        datasets: [
            {
                label: 'Task Status Breakdown',
                backgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                data: [0, 0, 0, 0],
            },
        ],
    });
    const [pieChartData, setPieChartData] = useState({
        labels: ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE'],
        datasets: [
            {
                data: [0, 0, 0, 0],
                backgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                hoverBackgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
            },
        ],
    });

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) {
            return "N/A";
        }
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDate = new Date(dateTimeString.replace(' ', 'T')).toLocaleString(undefined, options);
        return formattedDate;
    };

    useEffect(() => {
        const fetchSprintStats = async () => {
            try {
                const response = await fetch(`http://localhost:8082/sprints/stats/${id}`);
                const data = await response.json();
                setBarChartData({
                    labels: ['0-10', '10-20', '20-30', '>30'],
                    datasets: [
                        {
                            label: 'Age of Pending issues',
                            backgroundColor: [
                                '#98FB98', // Green for Low severity
                                '#FFD700', // Yellow for Medium severity
                                '#FFA07A', // Light Coral for High severity
                                '#FF6347'  // Tomato for Critical severity
                            ],
                            data: data.issuesByAgeRange,
                        },
                    ],
                });

                setPieChartData({
                    labels: ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE'],
                    datasets: [
                        {
                            data: data.taskStatusCounts,
                            backgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                            hoverBackgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                        },
                    ],
                });
                setStatsData({
                    memberStatsMap: data.memberStatsMap,
                    teamStats: {
                        donePoints: data.donePoints,
                        totalPoints: data.totalPoints
                    }
                })
            } catch (error) {
                console.error('Error fetching sprint stats:', error);
            }
        };

        const fetchIssues = async () => {
            try {
                const response = await fetch(`http://localhost:8082/issues/sprintid/${id}`);
                const data = await response.json();
                setIssues(data);  // Assuming the response is an array of issues
                setSprintDetails(data[0].sprint);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };


        if (showStats) {
            fetchSprintStats();
        }

        if (!showStats) {
            fetchIssues();
        }

    }, [id, showStats]);

    const toggleStats = () => {
        setShowStats(!showStats);
        setShowLabel(showStats ? "Show sprint statistics" : "Show sprint overview");
    };

    return (
        <div className='sprint-page-main'>
            <Navbar active="projects" />
            <div className="stats-button-container">
                <button className='stats-button' onClick={toggleStats}>
                    {showLabel}
                </button>
                {/* <button className='stats-button' onClick={toggleMember}>
                    {showLabel1}
                </button> */}
            </div>
            {!showStats && sprintDetails && issues && (
                <div>
                    <div className="sprint-page-container">
                        <h1>{sprintDetails.name} Overview</h1>
                        <div className="sprint-details-box">
                            <p>Start Date: {formatDateTime(sprintDetails.startDate)}</p>
                            <p>End Date: {formatDateTime(sprintDetails.endDate)}</p>
                            {/* Add more details as needed */}
                            <p>Duration: {sprintDetails.duration}</p>
                            <p>Status: {sprintDetails.status}</p>
                        </div>
                    </div>
                    <h2>Issues in Sprint</h2>
                    <div className="issue-cards-container">
                        {issues && issues.map(issue => (
                            <div key={issue.id} className={`issue-card ${issue.status.toLowerCase()}`}>
                                <h3>{issue.description}</h3>
                                <p>ID: {issue.id}</p>
                                <p>Creator: {issue.ownerName}</p>
                                <p>Status: {issue.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showStats && statsData && (
                <Sprintstats pieChartData={pieChartData} barChartData={barChartData} statsData={statsData} />
            )}
        </div>
    );
};

export default SprintPage;
