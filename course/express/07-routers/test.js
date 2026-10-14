check('The code creates a router with express.Router()', () => {
  learner();
  ok(/express\s*\.\s*Router\s*\(/.test(source), 'Create a router with const router = express.Router();');
});

check('GET /books sends all three books', async () => {
  const res = await request(learner()).get('/books');
  eq(res.status, 200, 'GET /books should answer with status 200. Did you mount the router with app.use("/books", router)?');
  eq(res.json.map((b) => b.title), ['Wings of Fire', 'Malgudi Days', 'The Guide']);
});

check('GET /books/2 sends the book Malgudi Days', async () => {
  const res = await request(learner()).get('/books/2');
  eq(res.json, { id: 2, title: 'Malgudi Days' }, 'Inside the router the path is "/:id", not "/books/:id".');
});

check('GET /books/3 finds a different book', async () => {
  const res = await request(learner()).get('/books/3');
  eq(res.json, { id: 3, title: 'The Guide' }, 'Convert the id with Number(req.params.id) before comparing.');
});

check('Paths outside the router, such as GET /, give 404', async () => {
  const res = await request(learner()).get('/');
  eq(res.status, 404, 'Only /books and below should exist. Do not mount the router at "/".');
});
