const express = require('express');
const app = express();

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/api/ping', (req, res) => {
  res.status(201).json({ created: true });
});

app.get('/api/secret', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.delete('/api/ping', (req, res) => {
  res.sendStatus(204);
});

module.exports = app;
