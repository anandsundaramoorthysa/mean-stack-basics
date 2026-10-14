const express = require('express');
const app = express();

const students = [];

app.get('/students', (req, res) => {
  res.json(students);
});

// Add express.json() and the two POST routes.

module.exports = app;
