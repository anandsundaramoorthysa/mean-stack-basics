const express = require('express');
const app = express();

app.use(express.json());

const students = [{ id: 1, name: 'Asha', marks: 82 }];
let nextId = 2;

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, marks } = req.body ?? {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }
  if (typeof marks !== 'number' || marks < 0 || marks > 100) {
    return res.status(400).json({ error: 'marks must be a number from 0 to 100' });
  }
  const student = { id: nextId++, name: name.trim(), marks };
  students.push(student);
  res.status(201).json(student);
});

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

module.exports = app;
