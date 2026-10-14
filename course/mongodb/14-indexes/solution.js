db.users.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ customerId: 1, createdAt: -1 })
db.products.createIndex({ description: 'text' })
db.sessions.createIndex({ userId: 'hashed' })
