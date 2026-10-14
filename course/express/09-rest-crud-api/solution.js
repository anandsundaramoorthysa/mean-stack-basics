const express = require('express');
const app = express();

app.use(express.json());

let todos = [{ id: 1, title: 'Learn Express', done: false }];
let nextId = 2;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  res.json(todos.find((t) => t.id === Number(req.params.id)));
});

app.post('/todos', (req, res) => {
  const todo = { id: nextId++, title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  todo.title = req.body.title;
  todo.done = req.body.done;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.sendStatus(204);
});

module.exports = app;
