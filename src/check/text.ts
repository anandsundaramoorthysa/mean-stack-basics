import { CheckOutcome, CheckResult, TextCheck } from '../types';

export function runTextChecks(source: string, checks: TextCheck[]): CheckOutcome {
  const results: CheckResult[] = checks.map((c) => {
    const subject = c.collapseWhitespace === false ? source : source.replace(/\s+/g, ' ');
    let matched: boolean;
    try {
      matched = new RegExp(c.regex, c.flags ?? '').test(subject);
    } catch {
      return { name: c.name, ok: false, message: 'This check has an invalid pattern. Please report it.' };
    }
    const ok = c.not ? !matched : matched;
    return ok ? { name: c.name, ok } : { name: c.name, ok, message: c.hint ?? c.name };
  });
  return { passed: results.every((r) => r.ok), results };
}
