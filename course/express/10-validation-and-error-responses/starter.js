const express = require('express');
const app = express();

app.use(express.json());

const students = [{ id: 1, name: 'Asha', marks: 82 }];
let nextId = 2;

app.get('/students', (req, res) => {
  res.json(students);
});

// Add POST /students and GET /students/:id here, with checks.

module.exports = app;
