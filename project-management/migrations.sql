DROP DATABASE IF EXISTS project_management;

CREATE DATABASE project_management;

USE project_management;

DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS sprints;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS projects;


CREATE TABLE projects(
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE organization_projects (
    organization_id VARCHAR(50) NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE project_members (
    project_id INT,
    user_id VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE sprints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    start_date DATE NOT NULL,
    duration INT NOT NULL,
    end_date DATE DEFAULT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE issues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sprint_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    owner_id VARCHAR(50) NOT NULL,
    points INT DEFAULT 0,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id)
);


-- path : C:\Users\raksh\OneDrive\Documents\NITK\Semester 8\Distributed Database Systems\project\Sprint-Management-Microservices\project-management\migrations.sql


INSERT INTO projects (description) VALUES ("Project 1");
INSERT INTO projects (description) VALUES ("Project 2");
INSERT INTO projects (description) VALUES ("Project 3");

INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 1);
INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 2);
INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 3);


INSERT INTO sprints (project_id, start_date, duration, end_date, status)
    VALUES (1, "2024-02-01", 4, "2024-02-28", "Completed");
INSERT INTO sprints (project_id, start_date, duration, status)
    VALUES (1, "2024-03-01", 4, "Ongoing");

INSERT INTO project_members (project_id, user_id, role) VALUES (1, "1", "LEAD");
INSERT INTO project_members (project_id, user_id, role) VALUES (1, "2", "MEMBER");
INSERT INTO project_members (project_id, user_id, role) VALUES (1, "3", "MEMBER");
INSERT INTO project_members (project_id, user_id, role) VALUES (1, "4", "MEMBER");

INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (1, "Issue 1", "Completed",  "1", 10);
INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (1, "Issue 2", "Completed",  "2", 5);
INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (1, "Issue 3", "Completed",  "3", 10);

INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (2, "Issue 1", "Todo",  "1", 10);
INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (2, "Issue 2", "In Progress",  "2", 10);
INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (2, "Issue 3", "In Progress",  "3", 10);
INSERT INTO issues (sprint_id, description, status, owner_id, points)
    VALUES (2, "Issue 4", "Completed",  "4", 10);