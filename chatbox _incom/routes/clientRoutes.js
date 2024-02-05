const express = require('express');
const path = require('path');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.use('/client', (socket) => {
  clientController(socket);
});

module.exports = router;
