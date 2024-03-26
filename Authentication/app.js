const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(cors());
const PORT = 2000;

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/oauth2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  empID: { type : String, unique: true},
  orgID: String,
  name: String,
  password: String,
  role: String,
  orgName: String,
});

// Define organisation schema
const organisationSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
const Organisation = mongoose.model('Organisation', organisationSchema);
const secretKey = 'yourSecretKey';

app.use(express.json());

// Enable parsing of JSON bodies

// Authorization server endpoints
// Registration endpoint
app.post('/register', async (req, res) => {
  const empID = req.body.empID
  const orgName = req.body.organisationName
  const name = req.body.name
  const password = req.body.Password
  const role = 'OWNER'

  // Create a new user
  await Organisation.findOneAndUpdate({ name: orgName }, { name: orgName }, { upsert: true });
  const organisation = await Organisation.findOne({ name: orgName });
  await User.findOneAndUpdate({}, { empID: empID, orgID: organisation._id, orgName: orgName, name: name, password: password, role: role }, { upsert: true });
  console.log('User registered successfully');
  res.status(201).send('User registered successfully');
});

// Login endpoint
app.post('/login', async (req, res) => {
  const empID = req.body.empID
  const password = req.body.Password
  console.log(empID, password);
  // Check if the user exists
  const user = await User.findOne({ empID: empID, password: password });
  console.log(user);
  if (!user) {
    console.log('Invalid credentials');
    res.status(401).send("Invalid credentials");
    return;
  }

  // Generate and return an access token
  const accessToken = jwt.sign({ empID: empID, role: user.role, orgID: user.orgID }, secretKey, { expiresIn: '5h' });
  // console.log('Org ', user.orgName);
  res.status(200).json({ token: accessToken, userId: empID, name: user.name, role: user.role, orgId: user.orgID, orgName: user.orgName});
});

app.get('/verify', async (req, res) => {
    console.log(req);
  const token = req.query.token
  console.log('Verifying', token);
//   const tokenObject = JSON.parse(jsonToken);
  try{
    const decoded = jwt.verify(token, secretKey);
    console.log("Decode successful", decoded);
    res.json(decoded);
    return;
  }catch(error){  
    console.log("Could not decode");
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Authentication server listening on port ${PORT}`);
});