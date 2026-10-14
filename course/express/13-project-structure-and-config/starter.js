const express = require('express');
const app = express();

// Build the config object from process.env with defaults here.

// Add GET /config here.

// In a real project this part lives in server.js.
// It is skipped by the checker because the file is loaded, not run directly.
if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
