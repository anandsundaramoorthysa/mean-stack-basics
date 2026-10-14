(function () {
  'use strict';

  var vscode = acquireVsCodeApi();
  var app = document.getElementById('app');
  var data = null;
  var progress = null;
  var shownHints = 0;
  var ui = {};

  var live = el('div', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
  document.body.appendChild(live);

  function el(tag, props) {
    var node = document.createElement(tag);
    var p = props || {};
    Object.keys(p).forEach(function (k) {
      var v = p[k];
      if (v === false || v == null) return;
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function append(node, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) kid.forEach(function (k) { append(node, k); });
    else node.appendChild(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }

  function say(text) {
    live.textContent = '';
    setTimeout(function () { live.textContent = text; }, 30);
  }

  function post(msg) { vscode.postMessage(msg); }

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- quiz ---------- */

  function legend(q) { return el('legend', { html: q.qHtml }); }

  function mcq(q, i) {
    var inputs = [];
    var fs = el('fieldset', null, legend(q));
    q.optionsHtml.forEach(function (html, k) {
      var input = el('input', { type: q.multi ? 'checkbox' : 'radio', name: 'q' + i, value: String(k) });
      inputs.push(input);
      fs.appendChild(el('label', { class: 'opt' }, input, el('span', { html: html })));
    });
    return {
      body: fs,
      hint: q.multi ? 'Choose every correct answer.' : '',
      evaluate: function () {
        var chosen = [];
        inputs.forEach(function (x, k) { if (x.checked) chosen.push(k); });
        if (!chosen.length) return null;
        return chosen.length === q.answer.length && q.answer.every(function (a) { return chosen.indexOf(a) >= 0; });
      },
      lock: function () { inputs.forEach(function (x) { x.disabled = true; }); },
    };
  }

  function fill(q, i) {
    var inputs = [];
    var pre = el('pre');
    var code = el('code');
    q.template.split('___').forEach(function (part, k, all) {
      code.appendChild(document.createTextNode(part));
      if (k < all.length - 1) {
        var input = el('input', { type: 'text', class: 'blank', 'aria-label': 'Blank ' + (k + 1), autocomplete: 'off', spellcheck: 'false' });
        inputs.push(input);
        code.appendChild(input);
      }
    });
    pre.appendChild(code);
    return {
      body: el('fieldset', null, legend(q), pre),
      evaluate: function () {
        var vals = inputs.map(function (x) { return x.value.trim(); });
        if (vals.some(function (v) { return !v; })) return null;
        return vals.every(function (v, k) { return q.blanks[k].indexOf(v) >= 0; });
      },
      lock: function () { inputs.forEach(function (x) { x.disabled = true; }); },
    };
  }

  function predict(q, i) {
    var input = el('input', { type: 'text', class: 'answer', id: 'pa' + i, autocomplete: 'off', spellcheck: 'false' });
    var accepted = [q.expected].concat(q.accept || []).map(norm);
    return {
      body: el('fieldset', null, legend(q), el('pre', null, el('code', null, q.code)), el('label', { for: 'pa' + i }, 'Your answer: '), input),
      evaluate: function () {
        if (!input.value.trim()) return null;
        return accepted.indexOf(norm(input.value)) >= 0;
      },
      lock: function () { input.disabled = true; },
    };
  }

  function order(q, i) {
    var current = q.order.slice();
    var list = el('ol', { class: 'order' });
    function draw() {
      list.textContent = '';
      current.forEach(function (idx, pos) {
        list.appendChild(el('li', null,
          el('code', null, q.lines[idx]),
          el('button', { type: 'button', 'aria-label': 'Move line ' + (pos + 1) + ' up', disabled: pos === 0, onclick: function () { move(pos, -1); } }, 'Up'),
          el('button', { type: 'button', 'aria-label': 'Move line ' + (pos + 1) + ' down', disabled: pos === current.length - 1, onclick: function () { move(pos, 1); } }, 'Down')));
      });
    }
    function move(pos, d) {
      var t = current[pos]; current[pos] = current[pos + d]; current[pos + d] = t;
      draw();
      var btn = list.children[pos + d] && list.children[pos + d].querySelectorAll('button')[d < 0 ? 0 : 1];
      if (btn && !btn.disabled) btn.focus();
      say('Moved to position ' + (pos + d + 1));
    }
    draw();
    return {
      body: el('fieldset', null, legend(q), list),
      evaluate: function () { return current.every(function (idx, pos) { return idx === pos; }); },
      lock: function () { list.querySelectorAll('button').forEach(function (b) { b.disabled = true; }); },
    };
  }

  function bug(q, i) {
    var selected = {};
    var box = el('pre');
    var buttons = [];
    q.code.split('\n').forEach(function (text, k) {
      var n = k + 1;
      var b = el('button', { type: 'button', class: 'bug-line', 'aria-pressed': 'false', 'aria-label': 'Line ' + n + ': ' + text, onclick: function () {
        selected[n] = !selected[n];
        b.setAttribute('aria-pressed', selected[n] ? 'true' : 'false');
      } }, el('span', { class: 'n' }, String(n)), el('span', null, text || ' '));
      buttons.push(b);
      box.appendChild(b);
    });
    return {
      body: el('fieldset', null, legend(q), box),
      evaluate: function () {
        var picked = Object.keys(selected).filter(function (n) { return selected[n]; }).map(Number);
        if (!picked.length) return null;
        return picked.length === q.answerLines.length && q.answerLines.every(function (n) { return picked.indexOf(n) >= 0; });
      },
      lock: function () { buttons.forEach(function (b) { b.disabled = true; }); },
    };
  }

  var BUILDERS = { mcq: mcq, fill: fill, predict: predict, order: order, bug: bug };
  var TYPE_LABEL = { mcq: 'Multiple choice', fill: 'Fill in the blank', predict: 'Predict the output', order: 'Put in order', bug: 'Find the bug' };

  function questionCard(q, i, solved) {
    var part = BUILDERS[q.type](q, i);
    var card = el('div', { class: 'card' });
    var feedback = el('div', { class: 'feedback', role: 'status', hidden: true });
    var check = el('button', { type: 'button', class: 'primary' }, 'Check answer');
    function show(ok, quiet) {
      card.className = 'card ' + (ok ? 'correct' : 'wrong');
      feedback.hidden = false;
      feedback.className = 'feedback ' + (ok ? 'ok' : 'no');
      feedback.innerHTML = '<strong>' + (ok ? 'Correct.' : 'Not quite. Read this and try again.') + '</strong>' + q.explainHtml;
      if (ok) {
        part.lock();
        check.hidden = true;
        if (!quiet) { post({ type: 'quiz', index: i, correct: true }); say('Correct.'); }
      } else say('Not quite.');
    }
    check.addEventListener('click', function () {
      var ok = part.evaluate();
      if (ok === null) { say('Answer the question first.'); return; }
      show(ok, false);
    });
    card.appendChild(el('div', { class: 'qtype' }, 'Question ' + (i + 1) + ' of ' + data.quiz.length + ' · ' + TYPE_LABEL[q.type] + (part.hint ? ' · ' + part.hint : '')));
    card.appendChild(part.body);
    card.appendChild(el('div', { class: 'row' }, check));
    card.appendChild(feedback);
    if (solved) {
      card.className = 'card correct';
      feedback.hidden = false;
      feedback.className = 'feedback ok';
      feedback.innerHTML = '<strong>You answered this correctly.</strong>' + q.explainHtml;
      part.lock();
      check.hidden = true;
    }
    return card;
  }

  /* ---------- exercise ---------- */

  function renderChecklist(results) {
    ui.checks.textContent = '';
    if (!results) {
      (data.exercise.checkNames || []).forEach(function (name) {
        ui.checks.appendChild(el('li', null, el('span', { class: 'status' }, 'Not checked yet'), name));
      });
      return;
    }
    results.forEach(function (r) {
      ui.checks.appendChild(el('li', { class: r.ok ? 'pass' : 'fail' },
        el('span', { class: 'status' }, r.ok ? 'Passed' : 'Needs work'), r.name,
        r.ok || !r.message ? null : el('span', { class: 'msg' }, r.message)));
    });
  }

  function renderResults(outcome) {
    ui.printed.textContent = '';
    ui.printed.hidden = true;
    ui.summary.textContent = '';
    ui.summary.className = 'notice';
    if (outcome.fatal) {
      ui.summary.className = 'notice bad';
      ui.summary.textContent = outcome.fatal;
      renderChecklist(null);
      say(outcome.fatal);
    } else {
      renderChecklist(outcome.results);
      var passed = outcome.results.filter(function (r) { return r.ok; }).length;
      var total = outcome.results.length;
      ui.summary.className = 'notice ' + (outcome.passed ? 'good' : 'bad');
      ui.summary.textContent = outcome.passed
        ? 'All ' + total + ' checks passed. Nice work.'
        : passed + ' of ' + total + ' checks passed. Fix the items marked "Needs work", save, and check again.';
      say(ui.summary.textContent);
    }
    if (outcome.printed && outcome.printed.length) {
      ui.printed.hidden = false;
      ui.printed.appendChild(el('summary', null, 'What your program printed'));
      ui.printed.appendChild(el('pre', null, el('code', null, outcome.printed.join('\n'))));
    }
    ui.ai.hidden = !(data.ai && data.ai.enabled) || !!outcome.passed;
  }

  function updateButtons() {
    if (!ui.solution) return;
    ui.solution.disabled = !progress.solutionAllowed;
    ui.solutionNote.hidden = !!progress.solutionAllowed;
    ui.hintBtn.textContent = shownHints >= 3 ? 'All hints shown' : 'Show hint ' + (shownHints + 1) + ' of 3';
    ui.hintBtn.disabled = shownHints >= 3;
  }

  function scalePreview() {
    if (!ui.previewBox) return;
    var scale = Math.min(1, ui.previewBox.clientWidth / 800);
    var frame = ui.previewBox.querySelector('iframe');
    if (!frame) return;
    frame.style.transform = 'scale(' + scale + ')';
    ui.previewBox.style.height = 500 * scale + 'px';
  }

  function runHtml(msg) {
    ui.preview.hidden = false;
    ui.previewBox.textContent = '';
    var frame = el('iframe', { sandbox: 'allow-same-origin', title: 'Preview of your page' });
    frame.addEventListener('load', function () {
      var results;
      try {
        results = window.MsbDomChecks.runChecks(frame.contentDocument, msg.checks, msg.html);
      } catch (e) {
        results = [{ name: 'Page check', ok: false, message: 'The check could not run: ' + e.message }];
      }
      post({ type: 'htmlResults', id: msg.id, results: results });
    });
    frame.srcdoc = msg.html;
    ui.previewBox.appendChild(frame);
    scalePreview();
  }

  function exerciseSection() {
    var ex = data.exercise;
    var section = el('section', { 'aria-labelledby': 'ex-h' }, el('h2', { id: 'ex-h' }, 'Exercise'));
    section.appendChild(el('div', { class: 'card' }, el('div', { class: 'task', html: ex.taskHtml })));
    section.appendChild(el('p', { class: 'filepath' }, 'Your file: ', el('code', null, ex.path)));

    ui.hintBtn = el('button', { type: 'button', onclick: function () { post({ type: 'hint', level: shownHints + 1 }); } }, '');
    ui.solution = el('button', { type: 'button', onclick: function () { post({ type: 'solution' }); } }, 'Compare with solution');
    ui.solutionNote = el('span', { class: 'filepath' }, 'Unlocks after 3 failed checks or all 3 hints.');
    ui.ai = el('button', { type: 'button', hidden: true, onclick: function () { ui.aiBox.hidden = false; ui.aiBox.textContent = 'Asking...'; post({ type: 'ai' }); } }, 'Stuck? Ask the AI helper');
    section.appendChild(el('div', { class: 'row' },
      el('button', { type: 'button', onclick: function () { post({ type: 'openExercise' }); } }, 'Open exercise file'),
      el('button', { type: 'button', class: 'primary', id: 'check-btn', onclick: function () { post({ type: 'check' }); } }, 'Check my code'),
      ui.hintBtn,
      el('button', { type: 'button', onclick: function () { post({ type: 'reset' }); } }, 'Reset file'),
      ui.solution, ui.solutionNote, ui.ai));

    ui.hints = el('div', { class: 'hints' });
    ui.summary = el('div', { class: 'notice', role: 'status' });
    ui.summary.hidden = false;
    ui.checks = el('ul', { class: 'checks', 'aria-label': 'Checks' });
    ui.printed = el('details', { hidden: true });
    ui.aiBox = el('div', { class: 'notice', hidden: true, role: 'status' });
    ui.aiBox.style.whiteSpace = 'pre-wrap';
    ui.previewBox = el('div', { class: 'preview-box' });
    ui.preview = el('div', { class: 'preview-wrap', hidden: true }, el('div', { class: 'label' }, 'Live preview of your page'), ui.previewBox);
    section.appendChild(ui.hints);
    section.appendChild(ui.aiBox);
    section.appendChild(ui.summary);
    section.appendChild(ui.checks);
    section.appendChild(ui.printed);
    section.appendChild(ui.preview);
    ui.summary.textContent = data.exercise.kind === 'js' ? 'Press "Check my code" to run the checks.' : '';
    ui.summary.hidden = !ui.summary.textContent;
    renderChecklist(null);
    return section;
  }

  /* ---------- page ---------- */

  function chips() {
    var wrap = el('ul', { class: 'chips', 'aria-label': 'Lesson status' });
    var answered = Object.keys(progress.quiz).filter(function (k) { return progress.quiz[k]; }).length;
    if (data.quiz.length) wrap.appendChild(el('li', { class: 'chip' + (answered === data.quiz.length ? ' ok' : '') }, 'Questions ' + answered + '/' + data.quiz.length));
    if (data.exercise) wrap.appendChild(el('li', { class: 'chip' + (progress.exercisePassed ? ' ok' : '') }, progress.exercisePassed ? 'Exercise passed' : 'Exercise not passed yet'));
    if (progress.done) wrap.appendChild(el('li', { class: 'chip ok' }, 'Lesson complete'));
    return wrap;
  }

  function render() {
    app.textContent = '';
    ui = {};
    shownHints = 0;
    var top = el('header', null,
      el('div', { class: 'crumb' }, data.trackTitle + ' · Lesson ' + data.nav.position + ' · about ' + data.minutes + ' min'),
      el('h1', null, data.title),
      el('p', { class: 'summary' }, data.summary));
    if (data.legacy) {
      top.appendChild(el('div', { class: 'legacy-banner' }, 'AngularJS 1.x reached end of life in January 2022. This track is for learners whose courses or code still use it. For new projects use the Angular track.'));
    }
    ui.chips = el('div');
    ui.chips.appendChild(chips());
    top.appendChild(ui.chips);
    app.appendChild(top);

    app.appendChild(el('section', { class: 'lesson-body', html: data.bodyHtml }));

    if (data.quiz.length) {
      var q = el('section', { 'aria-labelledby': 'quiz-h' }, el('h2', { id: 'quiz-h' }, 'Check your understanding'));
      data.quiz.forEach(function (question, i) { q.appendChild(questionCard(question, i, !!progress.quiz[i])); });
      app.appendChild(q);
    }
    if (data.exercise) app.appendChild(exerciseSection());

    ui.complete = el('div', { class: 'notice good', role: 'status', hidden: !progress.done }, 'Lesson complete. ');
    if (data.nav.next) ui.complete.appendChild(el('button', { type: 'button', class: 'primary', onclick: function () { post({ type: 'goto', id: data.nav.next.id }); } }, 'Next: ' + data.nav.next.title));
    app.appendChild(ui.complete);

    var docs = el('section', { class: 'docs', 'aria-labelledby': 'docs-h' }, el('h2', { id: 'docs-h' }, 'Read more in the official documentation'));
    var ul = el('ul');
    data.docs.forEach(function (d) {
      ul.appendChild(el('li', null, el('a', { href: d.url, 'data-url': d.url, title: d.url }, d.title)));
    });
    docs.appendChild(ul);
    app.appendChild(docs);

    var pager = el('nav', { class: 'pager', 'aria-label': 'Lesson navigation' });
    pager.appendChild(data.nav.prev
      ? el('button', { type: 'button', onclick: function () { post({ type: 'goto', id: data.nav.prev.id }); } }, 'Previous: ' + data.nav.prev.title)
      : el('span'));
    var right = el('span', { class: 'row' });
    if (!progress.done) right.appendChild(el('button', { type: 'button', onclick: function () { post({ type: 'markDone' }); } }, 'Mark as done'));
    if (data.nav.next) right.appendChild(el('button', { type: 'button', onclick: function () { post({ type: 'goto', id: data.nav.next.id }); } }, 'Next: ' + data.nav.next.title));
    pager.appendChild(right);
    app.appendChild(pager);

    updateButtons();
    window.scrollTo(0, 0);
    vscode.setState({ id: data.id });
    document.title = data.title;
  }

  function refreshStatus() {
    if (!ui.chips) return;
    ui.chips.textContent = '';
    ui.chips.appendChild(chips());
    if (ui.complete) ui.complete.hidden = !progress.done;
    updateButtons();
  }

  /* ---------- events ---------- */

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    var url = a.getAttribute('data-url') || (a.getAttribute('data-external') ? a.getAttribute('href') : '');
    if (url) post({ type: 'openDoc', url: url });
  });

  window.addEventListener('resize', scalePreview);

  window.addEventListener('message', function (event) {
    var m = event.data;
    switch (m.type) {
      case 'lesson':
        data = m.data;
        progress = data.progress;
        render();
        break;
      case 'progress':
        progress = m.progress;
        refreshStatus();
        break;
      case 'checking':
        if (ui.summary) { ui.summary.hidden = false; ui.summary.className = 'notice'; ui.summary.textContent = 'Checking your code...'; }
        break;
      case 'runHtml':
        if (ui.previewBox) runHtml(m);
        else post({ type: 'htmlResults', id: m.id, results: [] });
        break;
      case 'results':
        progress = m.progress;
        if (ui.summary) { ui.summary.hidden = false; renderResults(m.outcome); }
        refreshStatus();
        break;
      case 'hint':
        if (ui.hints) {
          shownHints = Math.max(shownHints, m.level);
          var box = el('div', { class: 'hint' }, el('b', null, 'Hint ' + m.level + ' of 3'));
          if (m.code !== undefined && m.code !== null) box.appendChild(el('pre', null, el('code', null, m.code)));
          else box.appendChild(el('span', { html: m.html }));
          ui.hints.appendChild(box);
          say('Hint ' + m.level + ' shown.');
          updateButtons();
        }
        break;
      case 'ai':
        if (!ui.aiBox) break;
        ui.aiBox.hidden = false;
        ui.aiBox.className = 'notice ' + (m.state === 'error' ? 'bad' : '');
        ui.aiBox.textContent = m.state === 'thinking' ? 'Thinking...' : m.state === 'reply' ? 'AI hint (it can be wrong, so check the official docs):\n\n' + m.text : m.text;
        break;
      case 'complete':
        if (ui.complete) ui.complete.hidden = false;
        say('Lesson complete.');
        break;
      case 'reset-done':
        if (ui.summary) { ui.summary.hidden = false; ui.summary.className = 'notice'; ui.summary.textContent = 'Your file was reset to the starter code.'; renderChecklist(null); }
        break;
      case 'exercise-opened':
        if (ui.summary && m.created) { ui.summary.hidden = false; ui.summary.className = 'notice'; ui.summary.textContent = 'Your exercise file was created. Edit it, save, then press Check my code.'; }
        break;
    }
  });

  app.appendChild(el('p', { class: 'summary' }, 'Loading lesson...'));
  post({ type: 'ready' });
})();
