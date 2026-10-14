const names = (res) => (Array.isArray(res.json) ? res.json.map((p) => p.name) : res.json);

check('GET /products with no query sends all four products', async () => {
  const res = await request(learner()).get('/products');
  eq(res.status, 200, 'GET /products should answer with status 200.');
  eq(names(res), ['Blue Pen', 'Notebook', 'Pencil Box', 'Red pen'], 'Without a query string every product should be sent as a JSON array.');
});

check('?q=pen keeps products with "pen" in the name, ignoring case', async () => {
  const res = await request(learner()).get('/products?q=pen');
  eq(names(res), ['Blue Pen', 'Pencil Box', 'Red pen'], 'Lower-case both the name and req.query.q before using includes.');
});

check('?q with no match sends an empty array', async () => {
  const res = await request(learner()).get('/products?q=laptop');
  eq(res.json, []);
});

check('?max=50 keeps products that cost 50 or less', async () => {
  const res = await request(learner()).get('/products?max=50');
  eq(names(res), ['Blue Pen', 'Notebook', 'Red pen'], 'Keep products where price <= Number(req.query.max).');
});

check('?q and ?max work together', async () => {
  const res = await request(learner()).get('/products?q=pen&max=11');
  eq(names(res), ['Blue Pen'], 'Apply both filters one after the other.');
});
