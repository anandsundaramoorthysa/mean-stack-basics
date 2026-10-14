MongoDB stores data as **documents**, which look like JavaScript objects. Documents live in **collections**, and a database holds many collections. A `students` collection might hold one document per student.

```js
{ name: 'Asha', marks: 91, city: 'Madurai' }
```

## find

`find` returns the documents that match a **filter**. The filter is an object describing what you want.

```js
db.students.find({ city: 'Madurai' })
```

An empty filter `{}` matches every document. To compare numbers use **query operators**, which start with `$`:

```js
db.students.find({ marks: { $gt: 80 } })
```

- `$gt` greater than, `$gte` greater than or equal
- `$lt` less than, `$lte` less than or equal
- `$eq` equal, `$ne` not equal

## How the exercises work

In this course your query runs against a small practice database built into the extension. Write the query as the last line of your file. It does not need a real MongoDB server.
