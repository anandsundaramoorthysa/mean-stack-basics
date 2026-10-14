import * as os from 'os';

const PATTERNS: [RegExp, string][] = [
  [/mongodb(?:\+srv)?:\/\/[^\s'"`]+/gi, 'mongodb://[redacted]'],
  [/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@'"`]+:[^\s/@'"`]+@[^\s'"`]+/gi, '[connection string redacted]'],
  [/\bBearer\s+[A-Za-z0-9._~+/=-]{16,}/gi, 'Bearer [token]'],
  [/\b(?:sk|pk|rk)-[A-Za-z0-9_-]{16,}\b/g, '[api key]'],
  [/\bAIza[0-9A-Za-z_-]{20,}\b/g, '[api key]'],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, '[token]'],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}\b/g, '[token]'],
  [/\bAKIA[0-9A-Z]{16}\b/g, '[api key]'],
  [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[email]'],
  [/\b[A-Za-z0-9+/_-]{40,}={0,2}(?![A-Za-z0-9+/_-])/g, '[token]'],
  [/[A-Za-z]:\\Users\\[^\\\s'"`]+/gi, '~'],
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function redact(text: string, home: string = os.homedir()): string {
  let out = text;
  if (home && home.length > 3) {
    const flipped = home.includes('\\') ? home.replace(/\\/g, '/') : home.replace(/\//g, '\\');
    for (const h of new Set([home, flipped])) out = out.replace(new RegExp(escapeRegExp(h), 'gi'), '~');
  }
  for (const [re, replacement] of PATTERNS) out = out.replace(re, replacement);
  return out;
}

export function stripCode(reply: string): string {
  const withoutFences = reply.replace(/```[\s\S]*?(?:```|$)/g, '[code removed: try writing this part yourself]');
  return withoutFences.replace(/\n{3,}/g, '\n\n').trim();
}
