db.students.updateOne({ name: 'Bala' }, { $set: { city: 'Chennai' } })
db.students.updateMany({ dept: 'CSE' }, { $inc: { marks: 5 } })
db.students.updateOne({ name: 'Asha' }, { $push: { badges: 'topper' } })
db.students.updateOne({ name: 'Chitra' }, { $unset: { phone: '' } })
