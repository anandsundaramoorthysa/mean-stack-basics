const express = require('express');
const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

const findTask = (req) => tasks.find((t) => t.id === Number(req.params.id));

app.get('/tasks', (req, res) => {
  let list = tasks;
  if (req.query.done === 'true') list = list.filter((t) => t.done);
  if (req.query.done === 'false') list = list.filter((t) => !t.done);
  res.json(list);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body ?? {};
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(400).json({ error: 'id must be a number' });
  }
  const task = findTask(req);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.patch('/tasks/:id', (req, res) => {
  const task = findTask(req);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, done } = req.body ?? {};
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'title must be a non-empty string' });
  }
  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({ error: 'done must be true or false' });
  }
  if (title !== undefined) task.title = title.trim();
  if (done !== undefined) task.done = done;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const task = findTask(req);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(tasks.indexOf(task), 1);
  res.sendStatus(204);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
