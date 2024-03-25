// index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
// import SprintDashboard from './components/Analysis/SprintDashboard'; // Import the SprintDashboard component
// import SprintPage from './components/Analysis/SprintPage';
import Projects from './components/Project Management/Projects';
import Project from './components/Project Management/Project';
import AddProject from './components/Project Management/AddProject';
import ProjectMembers from './components/Project Management/ProjectMembers';
import AddProjectMember from './components/Project Management/AddProjectMember';
import Sprint from './components/Project Management/Sprint';
import AddIssue from './components/Project Management/AddIssue';
import EditProject from './components/Project Management/EditProject';
import Backlog from './components/Project Management/Backlog';
import SprintPage from './components/Sprint/SprintPage';

import Qna from './components/Qna/Qna';
import Trail from './components/Qna/Trail';
import Answers from './components/Qna/Answers';
import Chat from './components/Team Chat/Chat';
import { AuthProvider } from './components/AuthProvider';

import io from 'socket.io-client';
import AddOrganizationMember from './components/Project Management/AddOrganizationMember';
import PrivateRoute from './components/PrivateRoute';
import TagQuestionList from './components/Qna/Tags';
import AddQuestion from './components/Qna/UserQNA';
import Logout from './components/Authentication/Logout';
import MyQuestions from './components/Qna/MyQuestions';

const root = ReactDOM.createRoot(document.getElementById('root'));

const socket = io.connect('http://localhost:7000');

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Projects />} />
            <Route path='/organization/members/new' element={<AddOrganizationMember />}></Route>

            {/* <Route path='/sprint-dashboard' element={<SprintDashboard />} /> */}
            {/* <Route path='/sprint/:sprintId' element={<SprintPage />} /> */}
            <Route path='/projects' element={<Projects />}></Route>
            <Route path='/projects/:projectId' element={<Project />}></Route>
            <Route path='/projects/:projectId/members' element={<ProjectMembers />}></Route>
            <Route path='/projects/:projectId/members/new' element={<AddProjectMember />}></Route>

            <Route path='/projects/new' element={<AddProject />}></Route>
            <Route path='/projects/:projectId/edit' element={<EditProject />}></Route>
            <Route path='/projects/:projectId/backlog' element={<Backlog />}></Route>
            <Route path='/projects/:projectId/sprints/:sprintId' element={<Sprint />}></Route>
            <Route path='/projects/:projectId/sprints/:sprintId/issues/new' element={<AddIssue />}></Route>
            <Route path='/projects/:projectId/sprints/:sprintId/analysis' element={<SprintPage />}></Route>
            <Route path='/Qna' element={<Qna />}></Route>
            <Route path='/projects/:projectId/chat' element={<Chat socket={socket} />}></Route>
            <Route path='/Answers' element={<Answers />}></Route>
            <Route path='/Trail' element={<Trail />}></Route>
            <Route path='/MyQuestion' element={<MyQuestions />}></Route>

            <Route path='/AddQuestion' element={<AddQuestion />}></Route>
            <Route path='/TagQuestion' element={<TagQuestionList />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);
