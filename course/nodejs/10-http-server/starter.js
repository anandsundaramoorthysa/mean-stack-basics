const http = require('node:http');

const server = http.createServer((req, res) => {
  // Look at req.url and send the right answer.
  res.end('TODO');
});

module.exports = server;
