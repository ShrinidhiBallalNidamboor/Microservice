DROP DATABASE IF EXISTS project_management;

CREATE DATABASE project_management;

USE project_management;

DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS sprints;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS projects;


CREATE TABLE projects(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL
);

CREATE TABLE organization_projects (
    organization_id VARCHAR(50) NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE project_members (
    project_id INT,
    user_id VARCHAR(50) NOT NULL,
    name VARCHAR(20) NOT NULL,
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
    start_date DATE NOT NULL,
    owner_id VARCHAR(50) NOT NULL,
    owner_name VARCHAR(20) NOT NULL,
    points INT DEFAULT 0,
    is_backlog TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id)
);

INSERT INTO projects (name, description) VALUES ("Project 1", "Description 1");
INSERT INTO projects (name, description) VALUES ("Project 2", "Description 2");
INSERT INTO projects (name, description) VALUES ("Project 3", "Description 3");

INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 1);
INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 2);
INSERT INTO organization_projects (organization_id, project_id) VALUES ("1", 3);


INSERT INTO sprints (project_id, start_date, duration, end_date, status)
    VALUES (1, "2024-02-01", 4, "2024-02-28", "Completed");
INSERT INTO sprints (project_id, start_date, duration, status)
    VALUES (1, "2024-03-01", 4, "Ongoing");

INSERT INTO project_members (project_id, name, user_id, role) VALUES (1, "Harry", "harry@btp.com", "LEAD");
INSERT INTO project_members (project_id, name, user_id, role) VALUES (1, "Chetan", "chethan@btp.com", "MEMBER");
INSERT INTO project_members (project_id, name, user_id, role) VALUES (1, "Suchin", "suchin@btp.com", "MEMBER");
-- INSERT INTO project_members (project_id, name, user_id, role) VALUES (1, "4", "MEMBER");

INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 1","DONE",  curdate(), "Harry", "1", 10);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 2",  "DONE",curdate(),  "Harry", "2", 5);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 3",  "DONE",  curdate(), "Harry", "3", 10);

INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 1", "TODO", curdate(),  "Chethan", "1", 10);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 2", "TODO", curdate(),  "Chethan", "2", 5);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 3", "TODO", curdate(),  "Chethan", "3", 10);

INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 1", "IN_PROGRESS", curdate(),  "Suchin", "1", 10);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 2", "IN_PROGRESS",curdate(),  "Suchin", "2", 5);
INSERT INTO issues (sprint_id, description, status, start_date, owner_name, owner_id, points)
    VALUES (1, "Issue 3", "IN_PROGRESS", curdate(), "Suchin", "3", 10);
