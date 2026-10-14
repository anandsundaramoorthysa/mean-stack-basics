const express = require('express');
const app = express();

const books = [
  { id: 1, title: 'Wings of Fire' },
  { id: 2, title: 'Malgudi Days' },
  { id: 3, title: 'The Guide' },
];

// Create the router, add its routes, then mount it at /books.

module.exports = app;
