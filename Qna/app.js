const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8000;

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'Qna'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// // Endpoint to serve the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('/Qna/myquestions', (req, res) => {
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    const sql = `SELECT * FROM questions where orgid='${orgid}' AND userid='${empid}' ORDER BY upvotes DESC`;

    console.log(empid);
    console.log(orgid);
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to get questions from the database
app.get('/Qna/questions', (req, res) => {
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    const sql = `SELECT * FROM questions where orgid='${orgid}' ORDER BY upvotes DESC`;

    console.log(empid);
    console.log(orgid);
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to get questions from the database
// app.get('/Userquestions', (req, res) => {
//     const sql = 'SELECT * FROM questions where username=;
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching questions from database:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json(results);
//     });
// });

// Endpoint to handle upvotes for a question
app.post('/Qna/upvote/:id', (req, res) => {
    const questionId = req.params.id; // Use 'id' for question ID
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    
    // Check if an entry already exists in the questions_upvote table for the given question ID, user ID, and organization ID
    const checkIfExistsQuery = `SELECT * FROM questions_upvote WHERE question_id = ${questionId} AND userid = '${empid}' AND orgid = '${orgid}'`;
    
    // Update upvotes for the question in the questions table
    const sqlUpdate = `UPDATE questions SET upvotes = upvotes + 1 WHERE id = ${questionId}`;
    
    // Insert an entry into the questions_upvote table
    const sqlInsert = `INSERT INTO questions_upvote (question_id, userid, orgid) VALUES (${questionId}, '${empid}', '${orgid}')`;

    // Perform both operations in a transaction
    connection.beginTransaction(function(err) {
        if (err) { 
            console.error('Error beginning transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        // Check if an entry already exists
        connection.query(checkIfExistsQuery, function(err, results) {
            if (err) { 
                console.error('Error checking if entry exists in questions_upvote table:', err);
                connection.rollback(function() {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
                return;
            }

            // If an entry already exists, send a message indicating the upvote was already recorded
            if (results.length > 0) {
                res.json({ message: 'Upvote already recorded for this question' });
                return;
            }

            // Update upvotes in the questions table
            connection.query(sqlUpdate, function(err, updateResults) {
                if (err) { 
                    console.error('Error upvoting question:', err);
                    connection.rollback(function() {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                    return;
                }
                
                // Insert entry into the questions_upvote table
                connection.query(sqlInsert, function(err, insertResults) {
                    if (err) { 
                        console.error('Error inserting into questions_upvote table:', err);
                        connection.rollback(function() {
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                        return;
                    }
                    
                    // Commit the transaction
                    connection.commit(function(err) {
                        if (err) { 
                            console.error('Error committing transaction:', err);
                            connection.rollback(function() {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                            return;
                        }
                        res.json({ message: 'Upvote successful' });
                    });
                });
            });
        });
    });
});

// // Endpoint to handle downvotes for a question
// app.post('/Qna/downvote/:id', (req, res) => {
//     const questionId = req.params.id;
//     const sql = `UPDATE questions SET downvotes = downvotes + 1 WHERE id = ${questionId}`;
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error downvoting question:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Downvote successful' });
//     });
// });


// Endpoint to handle downvotes for a question
app.post('/Qna/downvote/:id', (req, res) => {
    const questionId = req.params.id; // Use 'id' for question ID
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    
    // Check if an entry already exists in the questions_downvote table for the given question ID, user ID, and organization ID
    const checkIfExistsQuery = `SELECT * FROM questions_downvote WHERE question_id = ${questionId} AND userid = '${empid}' AND orgid = '${orgid}'`;
    
    // Update downvotes for the question in the questions table
    const sqlUpdate = `UPDATE questions SET downvotes = downvotes + 1 WHERE id = ${questionId}`;
    
    // Insert an entry into the questions_downvote table
    const sqlInsert = `INSERT INTO questions_downvote (question_id, userid, orgid) VALUES (${questionId}, '${empid}', '${orgid}')`;

    // Perform both operations in a transaction
    connection.beginTransaction(function(err) {
        if (err) { 
            console.error('Error beginning transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        // Check if an entry already exists
        connection.query(checkIfExistsQuery, function(err, results) {
            if (err) { 
                console.error('Error checking if entry exists in questions_downvote table:', err);
                connection.rollback(function() {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
                return;
            }

            // If an entry already exists, send a message indicating the downvote was already recorded
            if (results.length > 0) {
                res.json({ message: 'Downvote already recorded for this question' });
                return;
            }

            // Update downvotes in the questions table
            connection.query(sqlUpdate, function(err, updateResults) {
                if (err) { 
                    console.error('Error downvoting question:', err);
                    connection.rollback(function() {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                    return;
                }
                
                // Insert entry into the questions_downvote table
                connection.query(sqlInsert, function(err, insertResults) {
                    if (err) { 
                        console.error('Error inserting into questions_downvote table:', err);
                        connection.rollback(function() {
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                        return;
                    }
                    
                    // Commit the transaction
                    connection.commit(function(err) {
                        if (err) { 
                            console.error('Error committing transaction:', err);
                            connection.rollback(function() {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                            return;
                        }
                        res.json({ message: 'Downvote successful' });
                    });
                });
            });
        });
    });
});

// // Endpoint to handle upvotes for a question
// app.post('/answers/upvote/:id', (req, res) => {
//     console.log('answers upvote')
//     const questionId = req.params.id;
//     const sql = `UPDATE answers SET upvotes = upvotes + 1 WHERE id = ${questionId}`;
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error upvoting question:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Upvote successful' });
//     });
// });


// // Endpoint to handle upvotes for an answer
// app.post('/Qna/answers/upvote/:id', (req, res) => {
//     const answerId = req.params.id; // Use 'id' for answer ID
//     const empid = req.query.empid;
//     const orgid = req.query.orgid;

//     const sql = `UPDATE answers SET upvotes = upvotes + 1 WHERE id = ${answerId}`; // Use 'answerId' in the SQL query
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error upvoting answer:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Upvote successful' });
//     });
// });

// Endpoint to handle upvotes for an answer
app.post('/Qna/answers/upvote/:id', (req, res) => {
    const answerId = req.params.id; // Use 'id' for answer ID
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    
    // Check if an entry already exists in the answers_upvote table for the given answer ID, user ID, and organization ID
    const checkIfExistsQuery = `SELECT * FROM answers_upvote WHERE answer_id = ${answerId} AND userid = '${empid}' AND orgid = '${orgid}'`;
    
    // Update upvotes for the answer in the answers table
    const sqlUpdate = `UPDATE answers SET upvotes = upvotes + 1 WHERE id = ${answerId}`;
    
    // Insert an entry into the answers_upvote table
    const sqlInsert = `INSERT INTO answers_upvote (answer_id, userid, orgid) VALUES (${answerId}, '${empid}', '${orgid}')`;

    // Perform both operations in a transaction
    connection.beginTransaction(function(err) {
        if (err) { 
            console.error('Error beginning transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        // Check if an entry already exists
        connection.query(checkIfExistsQuery, function(err, results) {
            if (err) { 
                console.error('Error checking if entry exists in answers_upvote table:', err);
                connection.rollback(function() {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
                return;
            }

            // If an entry already exists, send a message indicating the upvote was already recorded
            if (results.length > 0) {
                res.json({ message: 'Upvote already recorded for this answer' , update: 0});
                return;
            }

            // Update upvotes in the answers table
            connection.query(sqlUpdate, function(err, updateResults) {
                if (err) { 
                    console.error('Error upvoting answer:', err);
                    connection.rollback(function() {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                    return;
                }
                
                // Insert entry into the answers_upvote table
                connection.query(sqlInsert, function(err, insertResults) {
                    if (err) { 
                        console.error('Error inserting into answers_upvote table:', err);
                        connection.rollback(function() {
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                        return;
                    }
                    
                    // Commit the transaction
                    connection.commit(function(err) {
                        if (err) { 
                            console.error('Error committing transaction:', err);
                            connection.rollback(function() {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                            return;
                        }
                        res.json({ message: 'Upvote successful' });
                    });
                });
            });
        });
    });
});


// // Endpoint to handle upvotes for an answer
// app.post('/Qna/answers/downvote/:id', (req, res) => {
//     const answerId = req.params.id; // Use 'id' for answer ID
//     const sql = `UPDATE answers SET downvotes = downvotes + 1 WHERE id = ${answerId}`; // Use 'answerId' in the SQL query
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error downvoting answer:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Downvote successful' });
//     });
// });


// Endpoint to handle downvotes for an answer
app.post('/Qna/answers/downvote/:id', (req, res) => {
    const answerId = req.params.id; // Use 'id' for answer ID
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    
    // Check if an entry already exists in the answers_downvote table for the given answer ID, user ID, and organization ID
    const checkIfExistsQuery = `SELECT * FROM answers_downvote WHERE answer_id = ${answerId} AND userid = '${empid}' AND orgid = '${orgid}'`;
    
    // Update downvotes for the answer in the answers table
    const sqlUpdate = `UPDATE answers SET downvotes = downvotes + 1 WHERE id = ${answerId}`;
    
    // Insert an entry into the answers_downvote table
    const sqlInsert = `INSERT INTO answers_downvote (answer_id, userid, orgid) VALUES (${answerId}, '${empid}', '${orgid}')`;

    // Perform both operations in a transaction
    connection.beginTransaction(function(err) {
        if (err) { 
            console.error('Error beginning transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        // Check if an entry already exists
        connection.query(checkIfExistsQuery, function(err, results) {
            if (err) { 
                console.error('Error checking if entry exists in answers_downvote table:', err);
                connection.rollback(function() {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
                return;
            }

            // If an entry already exists, send a message indicating the downvote was already recorded
            if (results.length > 0) {
                res.json({ message: 'Downvote already recorded for this answer' });
                return;
            }

            // Update downvotes in the answers table
            connection.query(sqlUpdate, function(err, updateResults) {
                if (err) { 
                    console.error('Error downvoting answer:', err);
                    connection.rollback(function() {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                    return;
                }
                
                // Insert entry into the answers_downvote table
                connection.query(sqlInsert, function(err, insertResults) {
                    if (err) { 
                        console.error('Error inserting into answers_downvote table:', err);
                        connection.rollback(function() {
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                        return;
                    }
                    
                    // Commit the transaction
                    connection.commit(function(err) {
                        if (err) { 
                            console.error('Error committing transaction:', err);
                            connection.rollback(function() {
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                            return;
                        }
                        res.json({ message: 'Downvote successful' });
                    });
                });
            });
        });
    });
});



// // Endpoint to handle downvotes for a question
// app.post('/answers/downvote/:id', (req, res) => {
//     const questionId = req.params.id;
//     const sql = `UPDATE ansewrs SET downvotes = downvotes + 1 WHERE id = ${questionId}`;
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error downvoting question:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ message: 'Downvote successful' });
//     });
// });

app.get('/Qna/api/questions/:questionId/answers', (req, res) => {
    const {questionId} = req.params;
    const empid = req.query.empid;
    const orgid = req.query.orgid;
    console.log(questionId)
    // Query the database to get answers for the specified questionId
    connection.query('SELECT * FROM answers WHERE question_id = ? AND orgid=?',[questionId, orgid], (error, results) => {
      if (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Error fetching answers' });
      } else {
        res.json(results);
      }
    });
});

// Define a route to handle adding answers for a specific question
app.post('/Qna/api/answers/:questionId', (req, res) => {
    // const questionId = JSON.stringify(req);
    // console.log(req.body.userName)
    // Render a new page where users can add answers for the specified question
    // res.render('answers', { questionId: questionId });
    const empid = req.query.empid;
    const orgid = req.query.orgid;

    connection.query(`INSERT INTO answers (answer, question_id,userid,orgid) 
    VALUES ('${req.body.answer}', ${req.body.quesId},'${empid}','${orgid}' )`, (error, results) => {
        if (error) {
          console.error('Error fetching answers:', error);
          res.status(500).json({ error: 'Error fetching answers' });
        }
      });


    res.json({ message: 'successful' });
  });


// Define a route to handle adding answers for a specific question
app.post('/Qna/AddQuestion', (req, res) => {
    
    const empid = req.query.empid;
    const orgid = req.query.orgid;


    connection.query(`INSERT INTO questions (title, description, tag1, tag2, tag3,userid,orgid) 
    VALUES ('${req.body.question}', '${req.body.answer}', '${req.body.tag1}', '${req.body.tag2}', '${req.body.tag3}','${empid}','${orgid}')`, (error, results) => {
        if (error) {
          console.error('Error fetching answers:', error);
          res.status(500).json({ error: 'Error fetching answers' });
        }
      });


    res.json({ message: 'successful' });
  });
  
  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

