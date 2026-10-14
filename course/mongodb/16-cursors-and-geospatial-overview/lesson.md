## Cursors

`find` does not hand you all documents at once. It returns a **cursor**, a pointer that fetches results in batches as you read them. The shell prints the first few for you, which hides this. Common ways to use a cursor:

```js
const cursor = db.students.find({ marks: { $gt: 50 } })

cursor.toArray()            // all results in one array
cursor.forEach((d) => print(d.name))
cursor.hasNext()            // true while documents remain
cursor.next()               // the next document
```

You already know the methods that shape a cursor before you read it: `sort`, `skip` and `limit`. They return the cursor itself, so you can chain them. The practice database in this course supports all of the above, but not the geospatial features below.

Prefer `limit` and projection to `toArray` on large collections. Loading a million documents into one array uses a lot of memory.

## Geospatial data in brief

MongoDB can store places and answer questions such as "which shops are within 2 km of me?". Locations are stored as **GeoJSON**. A point looks like this, and the order is **longitude first, then latitude**:

```js
{ name: 'Meenakshi Temple', location: { type: 'Point', coordinates: [78.1198, 9.9195] } }
```

To query by distance you need a `2dsphere` index on the location field:

```js
db.places.createIndex({ location: '2dsphere' })
```

Then `$near` returns documents ordered from nearest to farthest, and `$maxDistance` limits the distance **in meters**:

```js
db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [78.12, 9.92] },
      $maxDistance: 2000
    }
  }
})
```

Other geospatial operators include `$geoWithin` (inside a shape) and `$geoIntersects`. This course cannot run geospatial queries, so you practise by writing them correctly.
