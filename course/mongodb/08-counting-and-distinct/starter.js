// The last line should be an array: [count of shipped orders, distinct cities of shipped orders]
[db.orders.countDocuments({}), db.orders.distinct('city')]
