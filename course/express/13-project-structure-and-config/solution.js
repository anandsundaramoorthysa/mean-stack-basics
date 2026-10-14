const express = require('express');
const app = express();

const config = {
  appName: process.env.APP_NAME || 'Task Manager',
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
};

app.get('/config', (req, res) => {
  res.json(config);
});

// In a real project this part lives in server.js.
// It is skipped by the checker because the file is loaded, not run directly.
if (require.main === module) {
  app.listen(config.port);
}

module.exports = app;
