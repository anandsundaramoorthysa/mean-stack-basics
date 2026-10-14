class Student {
  constructor(name) {
    this.name = name;
    this.marks = [];
  }

  addMark(mark) {
    this.marks.push(mark);
  }

  average() {
    if (this.marks.length === 0) return 0;
    return this.marks.reduce((sum, m) => sum + m, 0) / this.marks.length;
  }

  describe() {
    return this.name + ': ' + this.average();
  }
}

class Topper extends Student {
  describe() {
    return super.describe() + ' (topper)';
  }
}

module.exports = { Student, Topper };
