// A fake fetch: answers from a table of url -> { status, body }, and remembers the urls asked.
function fakeFetch(table) {
  const asked = [];
  const fn = async (url) => {
    asked.push(url);
    const entry = table[url];
    if (entry === 'offline') throw new TypeError('Failed to fetch');
    if (!entry) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: entry.status >= 200 && entry.status < 300, status: entry.status, json: async () => entry.body };
  };
  fn.asked = asked;
  return fn;
}

const students = [{ id: 1, name: 'Asha' }, { id: 2, name: 'Ravi' }];

check('getStudent asks for /api/students/<id>', async () => {
  const f = fakeFetch({ '/api/students/2': { status: 200, body: students[1] } });
  await learner().getStudent(f, 2);
  eq(f.asked, ['/api/students/2'], 'Build the URL as "/api/students/" + id.');
});
check('getStudent returns the parsed JSON', async () => {
  const f = fakeFetch({ '/api/students/1': { status: 200, body: students[0] } });
  eq(await learner().getStudent(f, 1), { id: 1, name: 'Asha' }, 'Return await response.json().');
});
check('getStudent throws "Request failed: 404" when the student is missing', async () => {
  const f = fakeFetch({});
  let error;
  try {
    await learner().getStudent(f, 99);
  } catch (e) {
    error = e;
  }
  ok(error instanceof Error, 'Check response.ok and throw an Error when it is false.');
  eq(error.message, 'Request failed: 404');
});
check('getNames returns only the names', async () => {
  const f = fakeFetch({ '/api/students': { status: 200, body: students } });
  eq(await learner().getNames(f), ['Asha', 'Ravi'], 'Map each student to student.name.');
});
check('getNames returns [] for an HTTP error', async () => {
  const f = fakeFetch({ '/api/students': { status: 500, body: [] } });
  eq(await learner().getNames(f), [], 'A 500 response is not ok, so return an empty array.');
});
check('getNames returns [] when the network is down', async () => {
  const f = fakeFetch({ '/api/students': 'offline' });
  eq(await learner().getNames(f), [], 'fetch rejected: catch the error and return an empty array.');
});
check('The code uses the fetchFn parameter, not a global fetch', () => {
  learner();
  ok(!/(^|[^\w.])fetch\s*\(/.test(source.replace(/\/\/.*$/gm, '')), 'Call fetchFn(...) instead of fetch(...).');
});
