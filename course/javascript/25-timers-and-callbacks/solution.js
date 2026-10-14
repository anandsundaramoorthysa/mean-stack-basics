function remindLater(message, ms, callback) {
  setTimeout(() => callback(message), ms);
}

function countdown(from, intervalMs, onTick, onDone) {
  let n = from;
  const id = setInterval(() => {
    if (n === 0) {
      clearInterval(id);
      onDone();
      return;
    }
    onTick(n);
    n = n - 1;
  }, intervalMs);
}

module.exports = { remindLater, countdown };
