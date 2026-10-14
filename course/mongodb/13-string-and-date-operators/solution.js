db.users.aggregate([
  {
    $project: {
      _id: 0,
      fullName: { $concat: ['$first', ' ', '$last'] },
      lastNameUpper: { $toUpper: '$last' },
      initial: { $substrCP: ['$first', 0, 1] },
      domain: { $arrayElemAt: [{ $split: ['$email', '@'] }, 1] },
      joinedOn: { $dateToString: { format: '%Y-%m-%d', date: '$joined' } }
    }
  }
])
