const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

check('remindLater does not call the callback straight away', () => {
  const calls = [];
  learner().remindLater('Study', 30, (m) => calls.push(m));
  eq(calls, [], 'The callback must wait for the timer. Use setTimeout instead of calling it directly.');
});
check('remindLater calls the callback with the message after the delay', async () => {
  const calls = [];
  learner().remindLater('Study', 20, (m) => calls.push(m));
  await sleep(120);
  eq(calls, ['Study'], 'After 20 ms the callback should be called once with the message.');
});
check('countdown ticks from 3 down to 1', async () => {
  const ticks = [];
  learner().countdown(3, 10, (n) => ticks.push(n), () => {});
  await sleep(200);
  eq(ticks, [3, 2, 1], 'onTick should receive 3, then 2, then 1.');
});
check('countdown calls onDone once, after the last tick', async () => {
  const log = [];
  learner().countdown(2, 10, (n) => log.push('tick ' + n), () => log.push('done'));
  await sleep(250);
  eq(log, ['tick 2', 'tick 1', 'done'], 'Call onDone exactly once when the countdown ends, and stop the timer with clearInterval.');
});
check('countdown does not call onTick before the first interval', () => {
  const ticks = [];
  learner().countdown(2, 50, (n) => ticks.push(n), () => {});
  eq(ticks, [], 'Ticks should be driven by the timer, not a loop.');
});
check('countdown uses a timer', () => {
  learner();
  ok(/set(Interval|Timeout)\s*\(/.test(source), 'Use a timer such as setInterval (and stop it with clearInterval).');
});
