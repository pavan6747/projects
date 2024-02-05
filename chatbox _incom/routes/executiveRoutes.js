const express = require('express');
const path = require('path');
const executiveController = require('../controllers/executiveController');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.use('/executive', (socket) => {
  executiveController(socket);
});

module.exports = router;
