The app needs two questions answered by the database: who are the top scorers, and which department does best on average?

## Top scorers: find, sort, limit

```js
db.students.find({ marks: { $gte: 75 } }).sort({ marks: -1 }).limit(3)
```

- The filter keeps students with 75 marks or more.
- `sort({ marks: -1 })` orders by marks. `1` means smallest first, `-1` means largest first.
- `limit(3)` keeps only the first three after sorting.

## Averages: the aggregation pipeline

An **aggregation pipeline** is a list of **stages**. Documents enter the first stage and each stage passes its output to the next.

```js
db.students.aggregate([
  { $group: { _id: '$department', average: { $avg: '$marks' } } },
  { $sort: { average: -1 } },
])
```

- `$group` puts documents into buckets. `_id` says what to group by. A string starting with `$` means "the value of that field", so `'$department'` groups by department.
- `$avg` calculates the mean of a field for each bucket.
- `$sort` orders the buckets.

After `$group` the department name sits in `_id`. To give the result a friendlier shape, add a `$project` stage such as `{ $project: { _id: 0, department: '$_id', average: 1 } }`. It hides `_id`, copies the old `_id` into `department` and keeps `average`.

In the exercise, write both queries in `query.js`. The checker verifies the `find` text and runs the **last** statement against sample students.
