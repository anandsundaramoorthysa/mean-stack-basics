db.orders.insertOne({
  orderNo: 'A100',
  customer: { name: 'Asha', city: 'Madurai' },
  items: [
    { sku: 'PEN', qty: 2, price: 10 },
    { sku: 'BOOK', qty: 1, price: 50 }
  ]
})
