const express = require('express');
const app = express();
app.use(express.json());

const students = [
  { id: 1, name: 'Asha', department: 'CSE', marks: 91 },
  { id: 2, name: 'Bala', department: 'ECE', marks: 72 },
  { id: 3, name: 'Chitra', department: 'IT', marks: 67 },
];
let nextId = 4;

// Returns an error message, or null when the body is fine.
function validate(body) {
  const { name, department, marks } = body ?? {};
  if (typeof name !== 'string' || name.trim() === '') return 'name is required';
  if (typeof department !== 'string' || department.trim() === '') return 'department is required';
  if (typeof marks !== 'number' || marks < 0 || marks > 100) return 'marks must be 0 to 100';
  return null;
}

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const { name, department, marks } = req.body;
  const student = { id: nextId++, name, department, marks };
  students.push(student);
  res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: 'student not found' });
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const { name, department, marks } = req.body;
  Object.assign(student, { name, department, marks });
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'student not found' });
  students.splice(index, 1);
  res.status(204).end();
});

module.exports = app;
