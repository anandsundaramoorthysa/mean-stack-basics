// Build fullName, lastNameUpper, initial, domain and joinedOn with one $project stage.
db.users.aggregate([
  { $project: { _id: 0, first: 1 } }
])
