const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');

// const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(cors());
const PORT = 2000;

const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: 'gaakashacharya@gmail.com',
    pass: "password"
  }

});

// Generate random verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Object to store verification codes and their corresponding users
const verificationCodes = {};

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/oauth2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  empID: { type: String, unique: true },
  orgID: String,
  name: String,
  password: String,
  role: String,
  email: String,
  orgName: String,
});

// Define organisation schema
const organisationSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
const Organisation = mongoose.model('Organisation', organisationSchema);
const secretKey = 'your-secret-key';

app.use(express.json());

// Enable parsing of JSON bodies

// Authorization server endpoints
// Registration endpoint
app.post('/register', async (req, res) => {
  const empID = req.body.empID
  const orgName = req.body.organisationName
  const name = req.body.name
  const email = req.body.email
  const password = req.body.Password
  const role = 'OWNER'

  console.log(req.body)

  // Create a new user
  await Organisation.findOneAndUpdate({ name: orgName }, { name: orgName }, { upsert: true });
  const organisation = await Organisation.findOne({ name: orgName });
  await User.findOneAndUpdate({}, { empID: empID, orgID: organisation._id, orgName: orgName, name: name, email: email, password: password, role: role }, { upsert: true });
  console.log('User registered successfully');
  res.status(201).send('User registered successfully');
});

// Login endpoint
app.post('/login', express.json(), async (req, res) => {
  console.log(req.body)
  const empID = req.body.empID;
  const password = req.body.Password;

  // Check if the user exists
  const user = await User.findOne({ empID: empID, password: password });
  if (!user) {
    res.status(401).send("Invalid credentials");
    return;
  }

  console.log(user)

  // Generate verification code
  const verificationCode = generateVerificationCode();

  // Store the verification code along with user's email
  verificationCodes[user.email] = verificationCode;
  console.log(user.email)

  // Send verification code to user's email
  transporter.sendMail({
    from: 'gaakashacharya@gmail.com',
    to: user.email,
    subject: 'Login Verification Code',
    text: `Your verification code is: ${verificationCode}`
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending verification code');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Verification code sent to your email');
    }
  });
});





// 2factor Verification endpoint
app.post('/verify2fa', express.json(), async (req, res) => {
  const empID = req.body.empID;
  const verificationCode = req.body.verificationCode;

  console.log(req.body)

  try {
    // Query the database to get the user's email based on empID
    const user = await User.findOne({ empID: empID });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    console.log(verificationCodes)
    console.log(verificationCode)
    // Check if verification code matches
    if (verificationCodes[user.email] && verificationCodes[user.email] == verificationCode) {
      // Verification successful, remove the verification code
      console.log("inside")
      delete verificationCodes[user.email];
      // Generate and return an access token
      const accessToken = jwt.sign({ empID: empID, role: user.role, orgID: user.orgID }, 'your-secret-key', { expiresIn: '5h' });
      // console.log('Org ', user.orgName);
      res.status(200).json({ token: accessToken, userId: empID, name: user.name, email: user.email, role: user.role, orgId: user.orgID, orgName: user.orgName });
    } else {
      res.status(401).send("Invalid verification code");
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.get('/verify', async (req, res) => {
  console.log(req);
  const token = req.query.token
  console.log('Verifying', token);
  //   const tokenObject = JSON.parse(jsonToken);
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decode successful", decoded);
    res.json(decoded);
    return;
  } catch (error) {
    console.log("Could not decode");
    return res.status(401).json({ error: 'Invalid token' });
  }
});


app.post('/organizations/:id', express.json(), async (req, res) => {
  console.log(req.body);
  const user = req.body.user;
  const orgId = req.params.id;
  if (!user) {
    res.status(400).send('Missing user');
    return;
  }
  const found = await User.findOne({ empID: user.empId, orgID: orgId });
  if (found) {
    res.status(400).send("User already exists");
    return;
  }

  const newUser = new User({ empID: user.empId, name: user.name, email: user.email, orgID: orgId, orgName: user.orgName, password: user.password, role: user.role });
  console.log(newUser);


  try {
    const found = await newUser.save();
    res.status(201).send("User added");
    return;
  } catch (error) {
    res.status(400).send("Cannot add user");
    return;
  }


})

app.get('/organizations/:orgId/users/:empId', async (req, res) => {
  const orgId = req.params.orgId;
  const empId = req.params.empId;
  if (!orgId || !empId) {
    res.status(400).send("Missing parameters");
    return;
  }
  // Check if the user exists
  const user = await User.findOne({ orgID: orgId, empID: empId });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send({ empId: user.empID, orgId: user.orgID, role: user.role });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Authentication server listening on port ${PORT}`);
});