db.products.insertOne({ name: 'Pen', price: 10, stock: 100 })
db.products.insertMany([
  { name: 'Eraser', price: 5, stock: 300 },
  { name: 'Ruler', price: 20, stock: 150 }
])
