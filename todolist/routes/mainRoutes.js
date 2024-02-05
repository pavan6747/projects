// routes/mainRoutes.js

const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// Define a route for the root endpoint
router.get('/', mainController.getHomePage);

module.exports = router;
