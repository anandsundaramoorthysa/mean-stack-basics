function grade(marks) {
  if (marks >= 80) return 'A';
  if (marks >= 60) return 'B';
  if (marks >= 40) return 'C';
  return 'F';
}

function dayType(day) {
  switch (day) {
    case 'saturday':
    case 'sunday':
      return 'weekend';
    default:
      return 'weekday';
  }
}

function displayName(name) {
  if (name) {
    return name;
  }
  return 'Guest';
}

module.exports = { grade, dayType, displayName };
