import type { Memento } from '../progress';

export const USAGE_KEY = 'meanStackBasics.ai.usage';

interface Usage {
  date: string;
  count: number;
}

function today(now: Date): string {
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
}

export async function consumeAiRequest(memento: Memento, limit: number, now: Date = new Date()): Promise<{ allowed: boolean; used: number }> {
  const stored = memento.get<Usage | undefined>(USAGE_KEY, undefined);
  const usage: Usage = stored && stored.date === today(now) ? stored : { date: today(now), count: 0 };
  if (usage.count >= limit) return { allowed: false, used: usage.count };
  usage.count += 1;
  await memento.update(USAGE_KEY, usage);
  return { allowed: true, used: usage.count };
}
