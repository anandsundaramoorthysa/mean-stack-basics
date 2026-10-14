db.students.find({}, { name: 1, marks: 1, _id: 0 }).sort({ marks: -1 }).skip(3).limit(3)
