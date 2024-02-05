// app.js

const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const todoRoutes = require('./routes/todoRoutes')
const bodyParser = require('body-parser');
const path = require('path')
const connectDB = require('./db');
const mongoose = require('mongoose');

connectDB();


const app = express();

// Use body-parser middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Use the mainRoutes for the root path
app.use('/', mainRoutes);
app.use('/',todoRoutes)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
