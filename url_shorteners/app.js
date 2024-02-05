const express = require('express');
const shortid = require('shortid');
const app = express();

// In-memory database for storing short and original URLs
const urlDatabase = {};

app.use(express.json());
app.use(express.static('public'));

// Serve HTML form for shortening URLs
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Shorten URL endpoint
app.post('/shorten', (req, res) => {
  const originalUrl = req.body.originalUrl;
  const shortUrl = 'http://localhost:3000/' + shortid.generate();
  urlDatabase[shortUrl] = originalUrl;
  res.json({ shortUrl });
});

// Redirect to the original URL
app.get('/:shortUrl', (req, res) => {
  const originalUrl = urlDatabase['http://localhost:3000/' + req.params.shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
