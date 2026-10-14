db.products.aggregate([
  { $match: { category: 'gadget' } },
  { $sort: { price: -1 } },
  { $skip: 1 },
  { $limit: 2 },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      priceWithDelivery: { $add: ['$price', 50] }
    }
  }
])
