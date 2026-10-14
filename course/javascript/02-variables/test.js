check('studentName is the text Asha', () => {
  eq(learner().studentName, 'Asha', 'Export studentName with the value \'Asha\'.');
});
check('marks ends up as 80', () => {
  eq(learner().marks, 80, 'Start marks at 70, then add 10 so it becomes 80.');
});
check('studentName is declared with const', () => {
  ok(/\bconst\s+studentName\b/.test(source), 'Declare it as: const studentName = ...');
});
check('marks is declared with let and then reassigned', () => {
  ok(/\blet\s+marks\b/.test(source), 'Declare it as: let marks = 70;');
  ok(/\bmarks\s*(=|\+=|\+\+)(?!=)/.test(source.replace(/let\s+marks\s*=/, '')), 'Change marks on a later line, for example marks = marks + 10;');
});
check('The old keyword var is not used', () => {
  ok(!/\bvar\b/.test(source), 'Use const or let instead of var.');
});
