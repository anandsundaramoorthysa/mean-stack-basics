const express = require('express');
const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

// 1. GET /tasks (with the optional ?done filter)
// 2. POST /tasks
// 3. GET /tasks/:id
// 4. PATCH /tasks/:id
// 5. DELETE /tasks/:id
// 6. A 404 JSON catch-all, then the error handler. Both go last.

module.exports = app;
