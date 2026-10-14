db.sales.aggregate([
  { $sort: { amount: 1 } },
  {
    $group: {
      _id: '$region',
      lowest: { $min: '$amount' },
      highest: { $max: '$amount' },
      topRep: { $last: '$rep' },
      reps: { $push: '$rep' },
      products: { $addToSet: '$product' }
    }
  }
])
