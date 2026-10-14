const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Asha' },
  { id: 2, name: 'Ravi' },
  { id: 3, name: 'Meena' },
];

app.get('/greet/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  res.json(user);
});

app.get('/courses/:course/lessons/:lesson', (req, res) => {
  res.send(`Course ${req.params.course}, lesson ${req.params.lesson}`);
});

module.exports = app;
