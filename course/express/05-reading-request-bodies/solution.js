const express = require('express');
const app = express();

app.use(express.json());

const students = [];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

app.post('/students', (req, res) => {
  const student = { id: students.length + 1, name: req.body.name, marks: req.body.marks };
  students.push(student);
  res.status(201).json(student);
});

module.exports = app;
