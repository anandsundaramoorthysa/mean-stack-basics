const express = require('express');
const app = express();

const books = [
  { id: 1, title: 'Wings of Fire' },
  { id: 2, title: 'Malgudi Days' },
  { id: 3, title: 'The Guide' },
];

const router = express.Router();

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  res.json(books.find((b) => b.id === Number(req.params.id)));
});

app.use('/books', router);

module.exports = app;
