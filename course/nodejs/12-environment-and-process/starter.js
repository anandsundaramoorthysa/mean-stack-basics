// Read numbers from stdin (one per line) and print "Total: <sum>".
// With no numbers: console.error('No numbers given') and exit code 1.

let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  // your code here
});
