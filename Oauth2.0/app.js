const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(cors());
const PORT = 9000;


const proxyRoutes = [
  { path: '/Qna', target: 'http://localhost:8000' },
  { path: '/projects', target: 'http://localhost:4000' },
  { path: '/chat', target: 'http://localhost:7000' },
  { path: '/stats', target: 'http://localhost:8082' },
];

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

// Enable parsing of JSON bodies

// Authorization server endpoints
// Registration endpoint
app.post('/register', express.json(), async (req, res) => {
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
app.post('/login', express.json(), async (req, res) => {
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
  const accessToken = jwt.sign({ empID: empID, role: user.role, orgID: user.orgID }, 'your-secret-key', { expiresIn: '5h' });
  // console.log('Org ', user.orgName);
  res.status(200).json({ token: accessToken, userId: empID, name: user.name, role: user.role, orgId: user.orgID, orgName: user.orgName});
});

app.use((req, res, next) => {
  console.log("Inside middleware");
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  // Decrypt token to get id1 and id2 fields
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    console.log(decoded);
    const { empID, role, orgID } = decoded;
    console.log(empID, orgID);
    req.role = role;   
    req.empId = empID;
    req.orgId = orgID;
    console.log(req.url);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Set up proxy middleware for each route with JWT authentication
proxyRoutes.forEach(route => {
  app.use(route.path, createProxyMiddleware({
    target: route.target,

    changeOrigin: true,

    onProxyReq: (proxyReq, req) => {
      console.log('Proxy request:', req.method, req.url, '=>', route.target);
      // proxyReq.setHeader('Authorization', req.headers.authorization);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy response:', req.method, req.url, '<=', route.target, proxyRes.statusCode);
    }

  }));
});

app.post('/organizations/:id', express.json(), async (req, res) => {
  console.log(req.body);
  const user = req.body.user;
  const orgId = req.params.id;
  if(!user){
      res.status(400).send('Missing user');
      return;
  }
  const found = await User.findOne({ empID: user.empId, orgID: orgId });
  if(found){
    res.status(400).send("User already exists");
    return;
  }

  const newUser = new User({ empID: user.empId, name: user.name, orgID: orgId, orgName: user.orgName, password: user.password, role: user.role });
  console.log(newUser);
  newUser.save(function(err, user) {
    if (err) {
      res.status(400).send("Cannot add user");
      return;
    }
    res.status(201).send("User added");
  });
})

app.get('/organizations/:orgId/users/:empId', async (req, res) => {
  const orgId = req.params.orgId;
  const empId = req.params.empId;
  if(!orgId || !empId){
    res.status(400).send("Missing parameters");
    return;
  }
  // Check if the user exists
  const user = await User.findOne({ orgID: orgId, empID: empId });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send({empId: user.empID, orgId: user.orgID, role: user.role});
});





// app.post('/verify', async (req, res) => {
//   const jsonToken = req.body
//   const tokenObject = JSON.parse(jsonToken);
//   const decoded = jwt.verify(tokenObject, 'your-secret-key');
//   res.json(decoded);
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Authorization server listening on port ${PORT}`);
});