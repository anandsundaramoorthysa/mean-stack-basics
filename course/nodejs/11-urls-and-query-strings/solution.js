// Return { host, path, page, tags } for a full URL string.
function summarize(link) {
  const url = new URL(link);
  return {
    host: url.hostname,
    path: url.pathname,
    page: Number(url.searchParams.get('page') ?? 1),
    tags: url.searchParams.getAll('tag'),
  };
}

// Return https://example.com/search?q=<term>&page=<page> with the term encoded.
function buildSearchUrl(term, page) {
  const url = new URL('https://example.com/search');
  url.searchParams.set('q', term);
  url.searchParams.set('page', String(page));
  return url.toString();
}

module.exports = { summarize, buildSearchUrl };
