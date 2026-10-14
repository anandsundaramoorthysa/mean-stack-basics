async function getStudent(fetchFn, id) {
  const response = await fetchFn('/api/students/' + id);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return await response.json();
}

async function getNames(fetchFn) {
  try {
    const response = await fetchFn('/api/students');
    if (!response.ok) return [];
    const students = await response.json();
    return students.map((s) => s.name);
  } catch (error) {
    return [];
  }
}

module.exports = { getStudent, getNames };
