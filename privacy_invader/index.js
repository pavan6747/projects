const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const NodeWebcam = require('node-webcam');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Setup express middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup webcam
const Webcam = NodeWebcam.create({
  width: 1280,
  height: 720,
  quality: 100,
  output: 'jpeg',
  callbackReturn: 'location',
});

// Dummy user credentials (replace with your authentication logic)
const validUsername = process.env.VALID_USERNAME;
const validPasswordHash = process.env.VALID_PASSWORD_HASH; // Updated this line

// Max failed login attempts before capturing a photo
const maxFailedAttempts = 3;

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.send('Welcome to the protected route!');
});

let failedLoginAttempts = 0;

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received username:', username);
  console.log('Received password:', password);
  console.log('Stored hash:', validPasswordHash);

  if (username === validUsername && password && bcrypt.compareSync(password, validPasswordHash)) {
    // Successful login
    req.session.isAuthenticated = true;
    failedLoginAttempts = 0; // Reset the failed login attempts counter
    res.redirect('/');
  } else {
    // Unsuccessful login
    failedLoginAttempts++;

    if (failedLoginAttempts >= maxFailedAttempts) {
      // Capture photo and save it after reaching max failed attempts
      Webcam.capture('incorrect-login', (err, data) => {
        if (!err) {
          console.log('Photo captured:', data);
        } else {
          console.error('Error capturing photo:', err);
        }
      });

      failedLoginAttempts = 0; // Reset the failed login attempts counter after capturing photo
    }

    res.redirect('/login');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
