const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/api/info', (req, res) => {
  res.set('X-App-Name', 'Campus API');
  res.json({ ok: true });
});

app.get('/api/hello', (req, res) => {
  res.send(`Hello, ${req.get('x-name') || 'stranger'}`);
});

module.exports = app;
