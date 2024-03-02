const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
const PORT = 8000;

// MongoDB connection
mongoose.connect('mongodb://localhost/oauth2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  empID: String,
  orgID: String,
  password: String,
  role: String
});

// Define organisation schema
const organisationSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
const Organisation = mongoose.model('Organisation', organisationSchema);
const secretKey = 'yourSecretKey';

// Enable parsing of JSON bodies
app.use(bodyParser.json());

// Authorization server endpoints
// Registration endpoint
app.post('/register', async (req, res) => {
  const empID = req.body.empID
  const name = req.body.organisationName
  const password = req.body.Password
  const role = 'owner'

  // Create a new user
  await Organisation.findOneAndUpdate({name: name}, {name: name}, {upsert: true});
  const organisation = await Organisation.findOne({name: name});
  await User.findOneAndUpdate({}, {empID: empID, orgID: organisation._id, password: password, role: role}, {upsert: true});
  console.log('User registered successfully');
  res.status(201).send('User registered successfully');
});

// Login endpoint
app.post('/login', async (req, res) => {
  const empID = req.body.empID
  const password = req.body.Password

  // Check if the user exists
  const user = await User.findOne({ empID: empID, password: password });
  if (!user) {
    console.log('Invalid credentials');
  }

  // Generate and return an access token
  const accessToken = jwt.sign({ empID: empID, role:user.role, orgID: user.orgID }, 'your-secret-key', { expiresIn: '1h' });
  
  try {
    // Make a POST request to another server
    res.status(200).json({ success: true, data: accessToken });

  } catch (error) {
    console.error('Error:', error.message);
  }
});

app.post('/verify', async (req, res) => {
  const jsonToken = req.body
  const tokenObject = JSON.parse(jsonToken);
  const decoded = jwt.verify(tokenObject, 'your-secret-key');
  res.json(decoded);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Authorization server listening on port ${PORT}`);
});