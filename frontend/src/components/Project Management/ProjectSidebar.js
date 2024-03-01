import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/project-sidebar.css';

const ProjectSidebar = ({ active, projectId, projectName }) => {
    const isActive = (option) => {
        return active === option ? 'bg-light text-white' : ''; // Add bg-primary and text-white classes for active option
      };
    
      return (
        <div className="sidebar flex-grow-1">
          <h3 className="py-4 px-3"><Link to={`/projects/${projectId}`}>Project</Link> </h3>
            <div className={`sidebar-item ${isActive('sprints')} px-4 py-2`}>
              <Link to={`/projects/${projectId}`} className="sidebar-item-link">Sprints</Link>
            </div>
            <div className={`sidebar-item ${isActive('team')} px-4 py-2`}>
              <Link to={`/projects/${projectId}/members`} className="sidebar-item-link">Team</Link>
            </div>
            <div className={`sidebar-item ${isActive('backlog')} px-4 py-2`}>
              <Link to={`/projects/${projectId}/backlog`} className="sidebar-item-link">Backlog</Link>
            </div>
            <div className={`sidebar-item ${isActive('information')} px-4 py-2`}>
              <Link to={`/projects/${projectId}/information`} className="sidebar-item-link">Information</Link>
            </div>
        </div>
      );
};

export default ProjectSidebar;
