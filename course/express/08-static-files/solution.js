const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/guide', express.static('docs'));

app.get('/api/hi', (req, res) => {
  res.json({ hi: true });
});

module.exports = app;
