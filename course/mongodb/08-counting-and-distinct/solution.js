[db.orders.countDocuments({ status: 'shipped' }), db.orders.distinct('city', { status: 'shipped' })]
