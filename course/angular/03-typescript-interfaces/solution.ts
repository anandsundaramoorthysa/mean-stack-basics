export interface Student {
  id: number;
  name: string;
  email?: string;
}

export type Grade = 'A' | 'B' | 'C';

export const topper: Student = { id: 1, name: 'Asha' };

export function describe(s: Student): string {
  return `${s.id}: ${s.name}`;
}
