const seed = { products: [{ name: 'Notebook', price: 50, stock: 200 }] };
const docs = () => mongo(seed).collection('products');
const find = (name) => docs().find((d) => d.name === name);
check('The products collection now has 4 documents', () => {
  eq(docs().length, 4, 'Add exactly three products: Pen, Eraser and Ruler.');
});
check('Pen was added with price 10 and stock 100', () => {
  const d = find('Pen');
  ok(d, 'No product named Pen was found.');
  eq([d.price, d.stock], [10, 100], 'Pen needs price 10 and stock 100, written as numbers.');
});
check('Eraser and Ruler were added with the right values', () => {
  const e = find('Eraser');
  const r = find('Ruler');
  ok(e && r, 'Both Eraser and Ruler must be inserted.');
  eq([e.price, e.stock, r.price, r.stock], [5, 300, 20, 150], 'Check the price and stock of Eraser and Ruler.');
});
check('The original Notebook is still there', () => {
  ok(find('Notebook'), 'Do not remove the existing product.');
});
check('Uses insertOne and insertMany', () => {
  ok(/insertOne\s*\(/.test(source), 'Use insertOne for the Pen.');
  ok(/insertMany\s*\(/.test(source), 'Use insertMany for the other two.');
});
