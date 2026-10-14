check('summarize gives the host and the path', () => {
  const r = learner().summarize('https://example.com/list?page=3&tag=a&tag=b');
  eq(r.host, 'example.com', 'host is url.hostname.');
  eq(r.path, '/list', 'path is url.pathname (without the query).');
});
check('summarize gives page as a number', () => {
  eq(learner().summarize('https://example.com/list?page=3').page, 3, 'page should be the number 3, not the string "3". Use Number(...).');
});
check('page defaults to 1 when it is missing', () => {
  eq(learner().summarize('https://example.com/list').page, 1);
});
check('tags lists every tag value', () => {
  eq(learner().summarize('https://example.com/list?tag=a&page=2&tag=b').tags, ['a', 'b'], 'Use searchParams.getAll("tag").');
  eq(learner().summarize('https://example.com/list').tags, []);
});
check('buildSearchUrl builds the address', () => {
  eq(learner().buildSearchUrl('node', 1), 'https://example.com/search?q=node&page=1');
});
check('buildSearchUrl encodes special characters', () => {
  eq(learner().buildSearchUrl('node js', 2), 'https://example.com/search?q=node+js&page=2', 'A space must be encoded. Use url.searchParams.set instead of joining strings.');
  eq(learner().buildSearchUrl('Tom & Jerry', 1), 'https://example.com/search?q=Tom+%26+Jerry&page=1');
});
