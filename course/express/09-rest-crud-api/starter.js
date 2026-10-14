const express = require('express');
const app = express();

app.use(express.json());

let todos = [{ id: 1, title: 'Learn Express', done: false }];
let nextId = 2;

// Add the five routes here.

module.exports = app;
