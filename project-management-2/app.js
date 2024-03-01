const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'project_management'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.use(express.json());

// Add project in organization
app.post('/projects', (req, res) => {
    const { organization_id, description } = req.body;
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction: ', err);
            return;
        }
        const query1 = 'INSERT INTO projects (description) VALUES (?)';
        const query2 = 'INSERT INTO organization_projects (organization_id, project_id) VALUES (?, ?)';
        let projectId;
        connection.query(query1, [description], (err, result1) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error adding  project', err);
                    res.status(500).send('Error adding project');
                    return;
                });
            }
            projectId = result1.insertId;
            connection.query(query2, [organization_id, projectId], (err, result2) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error adding  project', err2);
                        res.status(500).send('Error adding project');
                        return;
                    });
                }
            });
        });

        connection.commit((err) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error adding  project', err2);
                    res.status(500).send('Error adding project');
                    return;
                });
            }
        });
        res.status(201).send('Project added successfully');
    })

})

// Fetch all projects in organization
app.get('/projects', (req, res) => {
    const organization_id = req.query.organization_id;
    if (!organization_id) {
        res.status(400).send('Missing organization_id parameter');
        return;
    }

    connection.query('SELECT * FROM organization_projects inner join projects on organization_projects.project_id = projects.id WHERE organization_id = ?', [organization_id], (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL: ', err);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results);
    });
});

// Fetch project details by ID
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;

    connection.query('SELECT * FROM projects WHERE id = ?', [projectId], (err, results) => {
        if (err) {
            console.error('Error fetching projects', err);
            res.status(500).send('Error fetching projects');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Project not found');
            return;
        }

        res.json(results[0]);
    });
});

// get project members
app.get('/projects/:id/members', (req, res) => {
    const projectId = req.params.id;

    connection.query('SELECT * FROM project_members WHERE project_id = ?', [projectId], (err, results) => {
        if (err) {
            console.error('Error fetching project members', err);
            res.status(500).send('Error fetching project members');
            return;
        }
        console.log(results);
        res.json(results);
    });
})

// add project member
app.post('/projects/:id/members', (req, res) => {
    const projectId = req.params.id;

    const {member} = req.body;
    connection.query('INSERT into project_members (project_id, name, user_id, role) VALUES (?, ?, ?, ?)', [parseInt(projectId), member.name, member.user_id, member.role], (err, results) => {
        if (err) {
            console.error('Error adding project member', err);
            res.status(500).send('Error adding project member');
            return;
        }
    });
    res.status(201).send("Project member added successfully");
})

// Fetch sprints of a project
app.get('/projects/:id/sprints', (req, res) => {
    const projectId = req.params.id;

    connection.query('SELECT * FROM sprints WHERE project_id = ?', [projectId], (err, results) => {
        if (err) {
            console.error('Error fetching sprints', err);
            res.status(500).send('Error fetching sprints');
            return;
        }

        res.json(results);
    });
});

// Fetch sprint information
app.get('/projects/:project_id/sprints/:sprint_id', (req, res) => {
    const projectId = req.params.project_id;
    const sprintId = req.params.sprint_id;

    connection.query('SELECT * FROM sprints WHERE project_id = ? and id = ?', [projectId, sprintId], (err, results) => {
        if (err) {
            console.error('Error fetching sprint information', err);
            res.status(500).send('Error fetching sprint information');
            return;
        }

        res.json(results[0]);
    });
});

// Fetch all issues of a sprint
app.get('/projects/:project_id/sprints/:sprint_id/issues', (req, res) => {
    const sprintId = req.params.sprint_id;

    connection.query('SELECT * FROM issues where sprint_id = ?', [sprintId], (err, results) => {
        if (err) {
            console.error('Error fetching sprint issues', err);
            res.status(500).send('Error fetching sprint issues');
            return;
        }

        res.json(results);
    });
});

// Create a new sprint
app.post('/projects/:project_id/sprints', (req, res) => {
    const projectId = req.params.project_id;

    const { sprint } = req.body;
    console.log(req.body);

    connection.query('INSERT INTO sprints (project_id, start_date, duration, status) VALUES (?, ?, ?, "Ongoing")', [projectId, sprint.start_date, sprint.duration], (err, results) => {
        if (err) {
            console.error('Error creating new sprint', err);
            res.status(500).send('Error creating new sprint');
            return;
        }
        sprint.project_id = projectId;
        sprint.id = results.insertId;
        sprint.status = "Ongoing";
        console.log(sprint);
        res.status(201).json(sprint);
    });
});

// Complete a sprint
app.put('/projects/:project_id/sprints/:sprint_id/complete', (req, res) => {

    const sprintId = req.params.sprint_id;

    connection.query('UPDATE sprints SET status = "Completed", end_date = CURDATE() where id = ?', [sprintId], (err, results) => {
        if (err) {
            console.error('Error completing new sprint', err);
            res.status(500).send('Error creating new sprint');
            return;
        }
        res.status(201).send("Sprint completed successfully");
    });
});


// Create an issue
app.post('/projects/:project_id/sprints/:sprint_id/issues', (req, res) => {
    const sprintId = req.params.sprint_id;
    const { issue } = req.body;


    if (!issue) {
        res.status(400).send('Missing issue in request body');
        return;
    }

    connection.query('INSERT INTO issues (sprint_id, description, status, owner_id, owner_name, points) VALUES (?, ?, "TODO", ?, ?, ?)', [sprintId, issue.description, issue.owner_id, issue.owner_name, issue.points], (err, results) => {
        if (err) {
            console.error('Error creating issue', err);
            res.status(500).send('Error creating issue');
            return;
        }
        issue.sprint_id = sprintId;
        issue.id = results.insertId;
        issue.status = "TODO";
        res.status(201).json(issue);
    });
});

// Update an issue
app.put('/projects/:project_id/sprints/:sprint_id/issues', (req, res) => {
    const sprintId = req.params.sprintId;
    const { issue } = req.body;

    console.log(req.body);

    if (!issue || !issue.id) {
        res.status(400).send('Missing issue in request body');
        return;
    }

    connection.query('UPDATE issues set description = ?, status = ?, points = ? where id = ?', [issue.description, issue.status, issue.points, issue.id], (err, results) => {
        if (err) {
            console.error('Error updating issue', err);
            res.status(500).send('Error updating issue');
            return;
        }
        res.status(200).send("Issue updated successfully");
    });
});

app.listen(PORT, () => {
    console.log("Project Mangement Microservice is running");
});
