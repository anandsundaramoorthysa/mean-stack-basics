db.students.find({
  'address.city': 'Madurai',
  scores: { $elemMatch: { subject: 'maths', mark: { $gte: 80 } } }
})
