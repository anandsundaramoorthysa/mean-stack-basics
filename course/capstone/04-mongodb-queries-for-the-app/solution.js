// Query 1: the three top scorers (marks of 75 or more), best first.
db.students.find({ marks: { $gte: 75 } }).sort({ marks: -1 }).limit(3)

// Query 2 (the last statement is the one that is checked):
// average marks of each department, highest average first.
db.students.aggregate([
  { $group: { _id: '$department', average: { $avg: '$marks' } } },
  { $project: { _id: 0, department: '$_id', average: 1 } },
  { $sort: { average: -1 } },
])
