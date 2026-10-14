// fetchFn works like the real fetch: fetchFn(url) returns a promise of a response.
// A response has .ok, .status and .json() (which returns a promise).

async function getStudent(fetchFn, id) {
  // TODO: request '/api/students/' + id
  //       throw new Error('Request failed: ' + status) when response.ok is false
  //       otherwise return the parsed JSON
}

async function getNames(fetchFn) {
  // TODO: request '/api/students', return the list of names
  //       return [] if the request fails or the response is not ok
}

module.exports = { getStudent, getNames };
