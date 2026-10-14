const express = require('express');
const app = express();

// Lets Express read JSON sent in a request body into req.body.
app.use(express.json());

// Our temporary "database": a plain array in memory.
const students = [
  { id: 1, name: 'Asha', department: 'CSE', marks: 91 },
  { id: 2, name: 'Bala', department: 'ECE', marks: 72 },
];
let nextId = 3;

// TODO 1: GET /students sends the whole array.

// TODO 2: POST /students validates req.body, adds a student, answers 201.

module.exports = app;
