// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import SprintDashboard from './components/Analysis/SprintDashboard'; // Import the SprintDashboard component
import SprintPage from './components/Analysis/SprintPage';
import Projects from './components/Project Management/Projects';
import Project from './components/Project Management/Project';
import AddProject from './components/Project Management/AddProject';
import ProjectMembers from './components/Project Management/ProjectMembers';
import AddProjectMember from './components/Project Management/AddProjectMember';
import Sprint from './components/Project Management/Sprint';
import AddIssue from './components/Project Management/AddIssue';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/sprint-dashboard' element={<SprintDashboard />} />
        <Route path='/sprint/:sprintId' element={<SprintPage />} />
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/projects/:projectId' element={<Project/>}></Route>        
        <Route path='/projects/:projectId/members' element={<ProjectMembers/>}></Route>
        <Route path='/projects/:projectId/members/new' element={<AddProjectMember/>}></Route>

        <Route path='/projects/new' element={<AddProject/>}></Route>
        <Route path='/projects/:projectId/sprints/:sprintId' element={<Sprint/>}></Route>        
        <Route path='/projects/:projectId/sprints/:sprintId/issues/new' element={<AddIssue/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
