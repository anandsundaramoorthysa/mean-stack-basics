db.orders.aggregate([
  {
    $lookup: {
      from: 'customers',
      localField: 'customerId',
      foreignField: '_id',
      as: 'customer'
    }
  },
  { $unwind: '$customer' },
  { $project: { _id: 0, item: 1, customerName: '$customer.name' } }
])
