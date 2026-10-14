db.tasks.deleteMany({ done: true })
db.tasks.deleteOne({ title: 'Old draft' })
