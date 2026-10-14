db.orders.aggregate([
  { $match: { status: 'paid' } },
  {
    $group: {
      _id: '$customer',
      total: { $sum: '$amount' },
      average: { $avg: '$amount' },
      orders: { $sum: 1 }
    }
  }
])
