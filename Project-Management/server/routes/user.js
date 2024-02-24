const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addproject', userController.form);
router.post('/addproject', userController.create);
router.get('/editproject/:id', userController.edit);
router.post('/editproject/:id', userController.update);
router.get('/viewproject/:id', userController.viewproject);
router.get('/viewproject/:id/addmember', userController.addmemberform);
router.post('/viewproject/:id/addmember', userController.createmember);

module.exports = router;