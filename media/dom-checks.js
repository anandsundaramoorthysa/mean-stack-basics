(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MsbDomChecks = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  function toKebab(prop) {
    return prop.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
  }

  function normalizeCss(doc, prop, value) {
    var win = doc.defaultView;
    var probe = doc.createElement('div');
    doc.body.appendChild(probe);
    probe.style.setProperty(prop, value);
    var out = win.getComputedStyle(probe).getPropertyValue(prop);
    doc.body.removeChild(probe);
    return out || value;
  }

  function matchText(actual, spec) {
    var text = String(actual == null ? '' : actual).replace(/\s+/g, ' ').trim();
    if (spec.equals !== undefined && text !== String(spec.equals).replace(/\s+/g, ' ').trim()) {
      return 'found "' + shorten(text) + '"';
    }
    if (spec.includes !== undefined && text.toLowerCase().indexOf(String(spec.includes).toLowerCase()) < 0) {
      return 'found "' + shorten(text) + '"';
    }
    if (spec.regex !== undefined && !new RegExp(spec.regex, spec.flags || '').test(text)) {
      return 'found "' + shorten(text) + '"';
    }
    return null;
  }

  function shorten(s) {
    return s.length > 60 ? s.slice(0, 57) + '...' : s;
  }

  function countFailure(n, count) {
    if (typeof count === 'number') return n === count ? null : 'found ' + n + ', expected ' + count;
    var min = count.min == null ? 0 : count.min;
    var max = count.max == null ? Infinity : count.max;
    if (n < min) return 'found ' + n + ', expected at least ' + min;
    if (n > max) return 'found ' + n + ', expected at most ' + max;
    return null;
  }

  function checkElement(doc, el, check) {
    if (check.text) {
      var t = matchText(el.textContent, check.text);
      if (t) return t;
    }
    if (check.attr) {
      var a = check.attr;
      var has = el.hasAttribute(a.name);
      if (a.present === false) {
        if (has) return 'attribute ' + a.name + ' should not be there';
      } else if (!has) {
        return 'missing attribute ' + a.name;
      } else {
        var m = matchText(el.getAttribute(a.name), a);
        if (m) return a.name + ': ' + m;
      }
    }
    if (check.style) {
      var s = check.style;
      var prop = toKebab(s.prop);
      var actual = doc.defaultView.getComputedStyle(el).getPropertyValue(prop).trim();
      if (s.equals !== undefined && actual !== normalizeCss(doc, prop, s.equals)) return prop + ' is "' + actual + '"';
      if (s.oneOf && s.oneOf.every(function (v) { return actual !== normalizeCss(doc, prop, v); })) return prop + ' is "' + actual + '"';
      if (s.regex !== undefined && !new RegExp(s.regex).test(actual)) return prop + ' is "' + actual + '"';
      var num = parseFloat(actual);
      if (s.min !== undefined && !(num >= s.min)) return prop + ' is ' + actual + ', expected at least ' + s.min;
      if (s.max !== undefined && !(num <= s.max)) return prop + ' is ' + actual + ', expected at most ' + s.max;
    }
    return null;
  }

  function runOne(doc, check, source) {
    if (check.source) {
      var sp = check.source;
      if (sp.includes !== undefined && source.indexOf(sp.includes) < 0) return 'not found in your code';
      if (sp.notIncludes !== undefined && source.indexOf(sp.notIncludes) >= 0) return 'should not be in your code';
      if (sp.regex !== undefined && !new RegExp(sp.regex, sp.flags || '').test(source)) return 'pattern not found in your code';
      return null;
    }
    var els;
    try {
      els = Array.prototype.slice.call(doc.querySelectorAll(check.selector));
    } catch (e) {
      return 'invalid selector';
    }
    var cf = check.count === undefined ? countFailure(els.length, { min: 1 }) : countFailure(els.length, check.count);
    if (cf) return cf;
    if (!els.length) return null;
    var scope = check.scope || 'first';
    var targets = scope === 'first' ? [els[0]] : els;
    var failures = targets.map(function (el) { return checkElement(doc, el, check); });
    if (scope === 'any') return failures.some(function (f) { return f === null; }) ? null : failures[0];
    return failures.find(function (f) { return f !== null; }) || null;
  }

  function runChecks(doc, checks, source) {
    return checks.map(function (check) {
      var failure;
      try {
        failure = runOne(doc, check, source || '');
      } catch (e) {
        failure = 'could not run this check (' + e.message + ')';
      }
      if (!failure) return { name: check.name, ok: true };
      return { name: check.name, ok: false, message: (check.hint ? check.hint + ' ' : '') + '(' + failure + ')' };
    });
  }

  return { runChecks: runChecks };
});
