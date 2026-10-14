const express = require('express');
const app = express();

app.get('/ok', (req, res) => {
  res.json({ ok: true });
});

app.get('/boom', () => {
  throw new Error('Something broke');
});

// A pretend database call that always fails.
const loadReport = () => Promise.reject(new Error('Database is down'));

app.get('/async-boom', async (req, res) => {
  const report = await loadReport();
  res.json(report);
});

app.get('/forbidden', () => {
  const err = new Error('No access');
  err.status = 403;
  throw err;
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
