const express = require('express');
const app = express();

const log = [];

app.use((req, res, next) => {
  log.push(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  req.user = 'guest';
  next();
});

app.get('/whoami', (req, res) => {
  res.send(`Hello, ${req.user}`);
});

app.get('/log', (req, res) => {
  res.json(log);
});

module.exports = app;
