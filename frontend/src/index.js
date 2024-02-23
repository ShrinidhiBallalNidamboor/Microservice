// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import SprintDashboard from './components/Sprint/SprintDashboard'; // Import the SprintDashboard component
import SprintPage from './components/Sprint/SprintPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Add a route for Sprint Dashboard */}
        <Route path='/sprint-dashboard' element={<SprintDashboard />} />
        <Route path='/sprint/:id' element={<SprintPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
