db.students.find({ city: { $in: ['Madurai', 'Salem'] }, marks: { $gte: 70 } })
