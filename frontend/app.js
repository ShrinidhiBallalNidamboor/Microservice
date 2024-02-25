const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'P1User'
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

// Endpoint to get questions from the database
app.get('/questions', (req, res) => {
    const sql = 'SELECT * FROM questions';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to handle upvotes for a question
app.post('/upvote/:id', (req, res) => {
    const questionId = req.params.id;
    console.log(questionId)
    const sql = `UPDATE questions SET upvotes = upvotes + 1 WHERE id = ${questionId}`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error upvoting question:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Upvote successful' });
    });
});

// Endpoint to handle downvotes for a question
app.post('/downvote/:id', (req, res) => {
    const questionId = req.params.id;
    const sql = `UPDATE questions SET downvotes = downvotes + 1 WHERE id = ${questionId}`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error downvoting question:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Downvote successful' });
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


// Endpoint to handle upvotes for an answer
app.post('/answers/upvote/:id', (req, res) => {
    const answerId = req.params.id; // Use 'id' for answer ID
    const sql = `UPDATE answers SET upvotes = upvotes + 1 WHERE id = ${answerId}`; // Use 'answerId' in the SQL query
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error upvoting answer:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Upvote successful' });
    });
});

// Endpoint to handle upvotes for an answer
app.post('/answers/downvote/:id', (req, res) => {
    const answerId = req.params.id; // Use 'id' for answer ID
    const sql = `UPDATE answers SET downvotes = downvotes + 1 WHERE id = ${answerId}`; // Use 'answerId' in the SQL query
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error downvoting answer:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Downvote successful' });
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

app.get('/api/questions/:questionId/answers', (req, res) => {
    const questionId = req.params.questionId;
    // Query the database to get answers for the specified questionId
    connection.query('SELECT * FROM answers WHERE question_id = ?', [questionId], (error, results) => {
      if (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Error fetching answers' });
      } else {
        res.json(results);
      }
    });
});

// Define a route to handle adding answers for a specific question
app.post('/api/answers/:questionId', (req, res) => {
    // const questionId = JSON.stringify(req);
    // console.log(req.body.userName)
    // Render a new page where users can add answers for the specified question
    // res.render('answers', { questionId: questionId });

    connection.query(`INSERT INTO answers (answer, user_name, question_id) 
    VALUES ('${req.body.answer}', '${req.body.userName}', ${req.body.quesId})`, (error, results) => {
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
