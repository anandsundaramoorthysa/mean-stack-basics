class Student {
  constructor(name) {
    // TODO: store name, and start marks as an empty array
  }

  addMark(mark) {
    // TODO: add the mark to this.marks
  }

  average() {
    // TODO: return the average, or 0 when there are no marks
  }

  describe() {
    // TODO: return "Name: average", for example "Asha: 80"
  }
}

class Topper extends Student {
  // TODO: describe() should return the parent's text plus " (topper)"
}

module.exports = { Student, Topper };
