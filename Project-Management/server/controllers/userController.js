const mysql = require('mysql');

//Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//View Projects
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM Project', (err, rows) => {
            //When done with connection, release it
            connection.release();

            if (!err) {
                //let removedUser = req.query.removed;
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }
            console.log('The data from Project table: \n', rows);
        });
    });
}

// Find Project by Search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;//search is the name of the actual input
        // User the connection
        connection.query('SELECT * FROM Project WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

exports.form = (req, res) => {
    res.render('add-project');
}

// Add new Project
exports.create = (req, res) => {
    //res.render('add-user');

    const { name, description } = req.body
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;//search is the name of the actual input
        // User the connection
        connection.query('INSERT INTO project SET name = ?, description = ?', [name, description], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('add-project', { alert: 'Project has been created successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from Project table: \n', rows);
        });
    });
}


// Edit Project
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM Project WHERE id=?', [req.params.id], (err, rows) => {
            //When done with connection, release it
            connection.release();

            if (!err) {
                res.render('edit-project', { rows });
            }
            else {
                console.log(err);
            }
            console.log('The data from Project table: \n', rows);
        });
    });
}


// Update project
exports.update = (req, res) => {
    const { name, description } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        //Use the connection
        connection.query('UPDATE Project SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id], (err, rows) => {
            //When done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log('Connected as ID ' + connection.threadId);

                    //Use the connection
                    connection.query('SELECT * FROM Project WHERE id=?', [req.params.id], (err, rows) => {
                        //When done with connection, release it
                        connection.release();

                        if (!err) {
                            res.render('edit-project', { rows, alert: `${name} has been updated!` });
                        }
                        else {
                            console.log(err);
                        }
                        //console.log('The data from user table: \n', rows);
                    });
                });
            }
            else {
                console.log(err);
            }
            console.log('The data from Project table: \n', rows);
        });
    });
}

//View a Project
exports.viewproject = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM ProjectMember WHERE projectID=? ORDER BY role', [req.params.id], (err, rows) => {
            //When done with connection, release it
            connection.release();

            if (!err) {
                res.render('view-project', { rows, id: req.params.id });
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

/*
exports.addmemberform = (req, res) => {
    res.render('add-member');
}
*/


exports.addmemberform = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM ProjectMember WHERE projectID = ? LIMIT 1', [req.params.id], (err, row) => {
            //When done with connection, release it
            connection.release();

            if (!err) {
                res.render('add-member', { row, id: req.params.id });
            }
            else {
                console.log(err);
            }
            console.log('The data from user table: \n', row);
        });
    });
}



// Add new member
exports.createmember = (req, res) => {
    //res.render('add-user');

    const { projectID, empID, password, role } = req.body
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;//search is the name of the actual input
        // User the connection
        connection.query('INSERT INTO ProjectMember SET projectID = ?, empID = ?, password = ?, role = ?', [projectID, empID, password, role], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('add-member', { id: projectID, alert: 'User has been created succesfully!' });
            } else {
                console.log(err);
            }
            //console.log('The data from Project table: \n', rows);
        });
    });
}



