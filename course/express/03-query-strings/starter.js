const express = require('express');
const app = express();

const products = [
  { id: 1, name: 'Blue Pen', price: 10 },
  { id: 2, name: 'Notebook', price: 45 },
  { id: 3, name: 'Pencil Box', price: 60 },
  { id: 4, name: 'Red pen', price: 12 },
];

// Add GET /products here.

module.exports = app;
