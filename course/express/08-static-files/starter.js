const express = require('express');
const app = express();

// Serve the folders here.

app.get('/api/hi', (req, res) => {
  res.json({ hi: true });
});

module.exports = app;
