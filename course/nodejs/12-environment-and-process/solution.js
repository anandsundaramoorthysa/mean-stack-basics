// Read numbers from stdin (one per line) and print "Total: <sum>".
// With no numbers: console.error('No numbers given') and exit code 1.

let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  const numbers = input.split('\n').filter((line) => line.trim() !== '').map(Number);
  if (numbers.length === 0) {
    console.error('No numbers given');
    process.exitCode = 1;
    return;
  }
  const total = numbers.reduce((sum, n) => sum + n, 0);
  console.log(`Total: ${total}`);
});
