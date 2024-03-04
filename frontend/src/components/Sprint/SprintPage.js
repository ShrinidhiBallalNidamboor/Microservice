import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";

import Navbar from '../Navbar';
import './../../css/sprintpage-css.css';
import Sprintstats from './SprintStats';

Chart.register(CategoryScale);


const SprintPage = () => {
    const { id } = useParams();
    const [showStats, setShowStats] = useState(false);
    // const [showMember, setShowMember] = useState(false);
    const [issues, setIssues] = useState([]);
    const [sprintDetails, setSprintDetails] = useState({});
    const [showLabel, setShowLabel] = useState("Show sprint statistics");
    // const [showLabel1, setShowLabel1] = useState("Show memberwise details");
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

    // // Sample sprint details
    // var sprintDetails = {
    //     id: null,
    //     status: null,
    //     startDate: null,
    //     endDate: null,
    // };

    const formatDateTime = (dateTimeString) => {

        if (!dateTimeString) {
            return "N/A"; // Or handle accordingly based on your requirements
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

        // Explicitly set the format to ISO 8601
        const formattedDate = new Date(dateTimeString.replace(' ', 'T')).toLocaleString(undefined, options);

        return formattedDate;
    };


    useEffect(() => {
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

        fetchIssues();
    }, [id]);  // Fetch issues when the 'id' parameter changes

    // Dummy data for issues
    // const issues = [
    //     { id: 1, name: 'Issue 1', creator: 'John Doe', status: 'TODO', storyPoints: 3 },
    //     { id: 2, name: 'Issue 2', creator: 'Jane Smith', status: 'IN_PROGRESS', storyPoints: 5 },
    //     { id: 3, name: 'Issue 3', creator: 'Bob Johnson', status: 'BLOCKED', storyPoints: 2 },
    //     { id: 4, name: 'Issue 4', creator: 'Alice Brown', status: 'BLOCKED', storyPoints: 4 },
    //     { id: 5, name: 'Issue 5', creator: 'Charlie Green', status: 'TODO', storyPoints: 1 },
    //     { id: 6, name: 'Issue 6', creator: 'David White', status: 'IN_PROGRESS', storyPoints: 3 },
    //     { id: 7, name: 'Issue 7', creator: 'Eva Black', status: 'BLOCKED', storyPoints: 2 },
    //     { id: 8, name: 'Issue 8', creator: 'Frank Gray', status: 'DONE', storyPoints: 8 },
    //     { id: 9, name: 'Issue 9', creator: 'Frank Gray', status: 'BLOCKED', storyPoints: 5 },
    //     { id: 10, name: 'Issue 10', creator: 'John Doe', status: 'DONE', storyPoints: 3 },
    //     { id: 11, name: 'Issue 11', creator: 'Frank Gray', status: 'IN_PROGRESS', storyPoints: 5 },
    //     { id: 12, name: 'Issue 12', creator: 'David White', status: 'IN_PROGRESS', storyPoints: 2 },
    //     { id: 13, name: 'Issue 13', creator: 'John Doe', status: 'DONE', storyPoints: 3 },
    //     { id: 14, name: 'Issue 14', creator: 'Jane Smith', status: 'DONE', storyPoints: 1 },
    // ];


    // useEffect(() => {
    //     // Initialize charts here
    //     const barChartCanvas = document.getElementById('barChartCanvas');
    //     const pieChartCanvas = document.getElementById('pieChartCanvas');

    //     const barChart = new Chart(barChartCanvas, {
    //         type: 'bar',
    //         data: barChartData,
    //     });

    //     const pieChart = new Chart(pieChartCanvas, {
    //         type: 'pie',
    //         data: pieChartData,
    //     });

    //     return () => {
    //         // Cleanup and destroy charts here
    //         // Make sure to destroy the charts to prevent memory leaks
    //         barChart.destroy();
    //         pieChart.destroy();
    //     };
    // }, [barChartData, pieChartData]); // Dependency array includes chart data to watch for changes

    const toggleStats = () => {

        if (!showStats) {
            setPieChartData({
                labels: ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE'],
                datasets: [
                    {
                        data: getTaskStatusCounts(),
                        backgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                        hoverBackgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                    },
                ],
            });

            setBarChartData({
                labels: ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE'],
                datasets: [
                    {
                        data: getTaskStatusCounts(),
                        backgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                        hoverBackgroundColor: ['#FFA07A', '#FFD700', '#FF6347', '#98FB98'],
                    },
                ],
            });


        }

        if (!showStats) {
            setShowLabel("Show sprint overview")
        } else {
            setShowLabel("Show sprint statistics")
        }

        setShowStats(!showStats);


    };

    // const toggleMember = () => {

    //     if (showLabel1 == "Show sprint statistics") { 
    //         setShowLabel1("Go back") 
    //     }
    //     else {
    //         setShowLabel1("Show sprint statistics") 
    //     }
    // }

    const getTaskStatusCounts = () => {
        const statusCounts = { TODO: 0, IN_PROGRESS: 0, BLOCKED: 0, DONE: 0 };
        issues.forEach((issue) => {
            statusCounts[issue.status]++;
        });
        return Object.values(statusCounts);
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
            {showStats && sprintDetails && issues && (
                <Sprintstats pieChartData={pieChartData} barChartData={barChartData} issues={issues} />
            )}
        </div>
    );
};

export default SprintPage;
