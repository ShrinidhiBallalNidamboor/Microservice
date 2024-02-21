const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
const PORT = 3000;
var url_back = 'http://localhost:3000/'

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

app.get("/", function(req, res){
    res.render("index");
});

app.get("/:url", function(req, res){
  url_back = req.params.url;
  res.redirect("/");
});

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
  res.redirect("/");
});

// Login endpoint
app.post('/login', async (req, res) => {
  const empID = req.body.empID
  const password = req.body.Password

  // Check if the user exists
  const user = await User.findOne({ empID: empID, password: password });
  if (!user) {
    console.log('Invalid credentials');
    res.redirect("/");
  }

  // Generate and return an access token
  const accessToken = jwt.sign({ empID: empID, role:user.role }, 'your-secret-key', { expiresIn: '1h' });
  
  try {
    const tokenObject = {
      accessToken: accessToken
    };
    // Convert the object to a JSON string
    const jsonTemporalToken = JSON.stringify(tokenObject);
    // Make a POST request to another server
    if(url_back != 'http://localhost:3000/'){
      const response = await axios.post(url_back, jsonTemporalToken);
      // Process the response from the other server
      const responseData = response.data;
      res.status(200).json({ success: true, data: responseData });
    }
    else{
      console.log('Invalid Operation')
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  res.redirect("/");
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