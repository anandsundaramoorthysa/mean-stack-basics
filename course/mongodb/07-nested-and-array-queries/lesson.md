Documents can hold other objects and arrays inside them.

```js
{
  name: 'Asha',
  address: { city: 'Madurai', pin: 625001 },
  subjects: ['maths', 'physics'],
  scores: [{ subject: 'maths', mark: 88 }, { subject: 'physics', mark: 71 }]
}
```

## Dot notation

To reach inside a nested object, join the names with a dot and put the whole path in quotes.

```js
db.students.find({ 'address.city': 'Madurai' })
```

Writing `{ address: { city: 'Madurai' } }` instead would ask for an address that is exactly that object, with no `pin`, so it matches nothing here.

## Arrays

If a field holds an array, a plain value matches when **any** element equals it.

```js
db.students.find({ subjects: 'maths' })
```

Two more helpers:

- `$size` matches arrays of an exact length: `{ subjects: { $size: 2 } }`.
- `$all` needs every listed value to be in the array: `{ subjects: { $all: ['maths', 'physics'] } }`.

## $elemMatch

Now imagine you want students with a maths mark of at least 80. Look at this attempt:

```js
db.students.find({ 'scores.subject': 'maths', 'scores.mark': { $gte: 80 } })
```

It can match a student with maths 60 and physics 90, because one element satisfies the first condition and a different element satisfies the second. To make **one element** satisfy **all** conditions, use `$elemMatch`:

```js
db.students.find({ scores: { $elemMatch: { subject: 'maths', mark: { $gte: 80 } } } })
```
