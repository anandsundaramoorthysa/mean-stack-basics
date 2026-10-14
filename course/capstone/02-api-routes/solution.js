const express = require('express');
const app = express();

// Lets Express read JSON sent in a request body into req.body.
app.use(express.json());

// Our temporary "database": a plain array in memory.
const students = [
  { id: 1, name: 'Asha', department: 'CSE', marks: 91 },
  { id: 2, name: 'Bala', department: 'ECE', marks: 72 },
];
let nextId = 3;

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, department, marks } = req.body ?? {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }
  if (typeof department !== 'string' || department.trim() === '') {
    return res.status(400).json({ error: 'department is required' });
  }
  if (typeof marks !== 'number' || marks < 0 || marks > 100) {
    return res.status(400).json({ error: 'marks must be a number from 0 to 100' });
  }
  const student = { id: nextId++, name: name.trim(), department: department.trim(), marks };
  students.push(student);
  res.status(201).json(student);
});

module.exports = app;
