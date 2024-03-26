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
  { path: '/login', target: 'http://localhost:2000' },
  { path: '/register', target: 'http://localhost:2000' },
];

// app.use(express.json());

app.use(async (req, res, next) => {
  console.log("Inside middleware");
  console.log(req.url);
  if(req.url!="/login" && req.url!="/register"){
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
    // Decrypt token to get id1 and id2 fields
    try {
      console.log("Verifying token");
      // var response = await fetch('http://localhost:2000/verify', {
      //   method: "POST",
      //   body: JSON.stringify({
      //     token: token
      //   })
      // });
      var response = await fetch(`http://localhost:2000/verify?token=${token}`)
      console.log(response.status);
      if(response.status == 401){
        console.log("Invalid token");
         res.status(401).send("Invalid token");
         return;
      }
      // console.log("Decoded", response);
      // const { empID, role, orgID } = decoded;
      // console.log(empID, orgID);
      // req.role = role;   
      // req.empId = empID;
      // req.orgId = orgID;
      console.log("Token is valid");
      console.log(req.url);
    } catch (error) {
      console.log("error" , error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  next();
});

// Set up proxy middleware for each route with JWT authentication
proxyRoutes.forEach(route => {
  app.use(route.path, createProxyMiddleware({
    target: route.target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      console.log('Proxy request:', req.method, req.url, '=>', route.target);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy response:', req.method, req.url, '<=', route.target, proxyRes.statusCode);
    }
  }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Gateway server listening on port ${PORT}`);
});