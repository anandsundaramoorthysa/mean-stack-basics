db.places.createIndex({ location: '2dsphere' })
db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [78.12, 9.92] },
      $maxDistance: 2000
    }
  }
})
