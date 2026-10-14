const express = require('express');
const app = express();

const products = [
  { id: 1, name: 'Blue Pen', price: 10 },
  { id: 2, name: 'Notebook', price: 45 },
  { id: 3, name: 'Pencil Box', price: 60 },
  { id: 4, name: 'Red pen', price: 12 },
];

app.get('/products', (req, res) => {
  let list = products;
  if (req.query.q) {
    const q = String(req.query.q).toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (req.query.max) {
    list = list.filter((p) => p.price <= Number(req.query.max));
  }
  res.json(list);
});

module.exports = app;
