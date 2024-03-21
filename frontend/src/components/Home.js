// Home.js

import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // Import Link
// import SprintDashboard from './Analysis/SprintDashboard';

const Home = () => {
    return (
        <div>
            <Navbar active="projects" />
            {/* Use Link to navigate to SprintDashboard */}
            {/* <Link to="/sprint-dashboard">Go to Sprint Dashboard</Link> */}
            {/* ... other components or content ... */}
        </div>
    );
}

export default Home;
