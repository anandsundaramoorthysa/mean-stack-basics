import * as vm from 'vm';
import { Aggregator, Query } from 'mingo';
import { update as updateObject } from 'mingo/updater';

type Doc = Record<string, any>;

let idCounter = 0;
function newId(): string {
  idCounter += 1;
  return '64b000000000000000' + String(idCounter).padStart(6, '0');
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v), (_k, val) => (typeof val === 'string' && /^\d{4}-\d\d-\d\dT[\d:.]+Z$/.test(val) ? new Date(val) : val));
}

export function plain(v: unknown): any {
  return v === undefined ? undefined : JSON.parse(JSON.stringify(v));
}

class ArrayCursor {
  private index = 0;
  constructor(protected docs: Doc[]) {}
  toArray(): Doc[] {
    return this.docs;
  }
  forEach(fn: (d: Doc) => void): void {
    this.docs.forEach(fn);
  }
  map(fn: (d: Doc) => any): any[] {
    return this.docs.map(fn);
  }
  hasNext(): boolean {
    return this.index < this.docs.length;
  }
  next(): Doc {
    return this.docs[this.index++];
  }
  count(): number {
    return this.docs.length;
  }
}

class FindCursor extends ArrayCursor {
  private cursor: ReturnType<Query['find']> | undefined;
  private sorted = false;
  constructor(docs: Doc[], filter: Doc, projection?: Doc) {
    super([]);
    this.cursor = new Query(filter ?? {}).find(docs, projection);
  }
  private materialize(): void {
    if (this.cursor) {
      this.docs = this.cursor.all() as Doc[];
      this.cursor = undefined;
    }
  }
  sort(spec: Doc): this {
    this.cursor?.sort(spec);
    this.sorted = true;
    return this;
  }
  skip(n: number): this {
    this.cursor?.skip(n);
    return this;
  }
  limit(n: number): this {
    this.cursor?.limit(n);
    return this;
  }
  toArray(): Doc[] {
    this.materialize();
    return super.toArray();
  }
  forEach(fn: (d: Doc) => void): void {
    this.materialize();
    super.forEach(fn);
  }
  map(fn: (d: Doc) => any): any[] {
    this.materialize();
    return super.map(fn);
  }
  hasNext(): boolean {
    this.materialize();
    return super.hasNext();
  }
  next(): Doc {
    this.materialize();
    return super.next();
  }
  count(): number {
    this.materialize();
    return super.count();
  }
}

export class MockDb {
  readonly collections: Record<string, Doc[]> = {};
  constructor(seed: Record<string, Doc[]>) {
    for (const [name, docs] of Object.entries(seed)) {
      this.collections[name] = clone(docs).map((d: Doc) => ({ _id: newId(), ...d }));
    }
  }
  collection(name: string): Collection {
    if (!this.collections[name]) this.collections[name] = [];
    return new Collection(this, name);
  }
}

class Collection {
  constructor(private db: MockDb, private name: string) {}
  private get docs(): Doc[] {
    return this.db.collections[this.name];
  }
  find(filter: Doc = {}, projection?: Doc): FindCursor {
    return new FindCursor(this.docs, filter, projection);
  }
  findOne(filter: Doc = {}, projection?: Doc): Doc | null {
    return (new FindCursor(this.docs, filter, projection).limit(1).toArray()[0]) ?? null;
  }
  countDocuments(filter: Doc = {}): number {
    return (new Query(filter).find(this.docs).all() as Doc[]).length;
  }
  distinct(field: string, filter: Doc = {}): any[] {
    const seen = new Set<string>();
    const out: any[] = [];
    for (const d of new Query(filter).find(this.docs).all() as Doc[]) {
      const v = field.split('.').reduce((o: any, k) => (o == null ? undefined : o[k]), d);
      const values = Array.isArray(v) ? v : [v];
      for (const x of values) {
        if (x === undefined) continue;
        const key = JSON.stringify(x);
        if (!seen.has(key)) {
          seen.add(key);
          out.push(x);
        }
      }
    }
    // The real server returns distinct values in sorted order for simple values.
    const simple = out.every((x) => typeof x === 'number' || typeof x === 'string' || typeof x === 'boolean');
    if (simple) out.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0));
    return out;
  }
  aggregate(pipeline: Doc[]): ArrayCursor {
    const agg = new Aggregator(pipeline, { collectionResolver: (n: string) => this.db.collections[n] ?? [] });
    return new ArrayCursor(agg.run(this.docs) as Doc[]);
  }
  insertOne(doc: Doc): Doc {
    const d = { _id: newId(), ...clone(doc) };
    this.docs.push(d);
    return { acknowledged: true, insertedId: d._id };
  }
  insertMany(docs: Doc[]): Doc {
    const insertedIds: Doc = {};
    docs.forEach((x, i) => {
      insertedIds[i] = this.insertOne(x).insertedId;
    });
    return { acknowledged: true, insertedIds };
  }
  private apply(filter: Doc, update: Doc, many: boolean, upsert: boolean): Doc {
    const matches = new Query(filter).find(this.docs).all() as Doc[];
    const targets = many ? matches : matches.slice(0, 1);
    if (!targets.length && upsert) {
      const seed: Doc = {};
      for (const [k, v] of Object.entries(filter)) if (!k.startsWith('$') && (typeof v !== 'object' || v === null)) seed[k] = v;
      const created = { _id: newId(), ...seed };
      updateObject(created, update);
      this.docs.push(created);
      return { acknowledged: true, insertedId: created._id, matchedCount: 0, modifiedCount: 0, upsertedCount: 1 };
    }
    let modified = 0;
    for (const t of targets) if (updateObject(t, update).length) modified += 1;
    return { acknowledged: true, insertedId: null, matchedCount: targets.length, modifiedCount: modified, upsertedCount: 0 };
  }
  updateOne(filter: Doc, update: Doc, opts: Doc = {}): Doc {
    return this.apply(filter, update, false, !!opts.upsert);
  }
  updateMany(filter: Doc, update: Doc, opts: Doc = {}): Doc {
    return this.apply(filter, update, true, !!opts.upsert);
  }
  private remove(filter: Doc, many: boolean): Doc {
    const matches = new Query(filter).find(this.docs).all() as Doc[];
    const doomed = new Set(many ? matches : matches.slice(0, 1));
    this.db.collections[this.name] = this.docs.filter((d) => !doomed.has(d));
    return { acknowledged: true, deletedCount: doomed.size };
  }
  deleteOne(filter: Doc): Doc {
    return this.remove(filter, false);
  }
  deleteMany(filter: Doc): Doc {
    return this.remove(filter, true);
  }
  createIndex(spec: Doc): string {
    return Object.entries(spec).map(([k, v]) => `${k}_${v}`).join('_');
  }
}

export function createDb(db: MockDb): any {
  return new Proxy({}, {
    get(_t, prop: string) {
      if (prop === 'getCollection') return (n: string) => db.collection(n);
      if (typeof prop !== 'string') return undefined;
      return db.collection(prop);
    },
  });
}

export function runLearnerQuery(source: string, seed: Record<string, Doc[]>): { result: any; db: MockDb } {
  const mock = new MockDb(seed);
  const ctx = vm.createContext({
    db: createDb(mock),
    ObjectId: (s?: string) => s ?? newId(),
    ISODate: (s?: string) => (s ? new Date(s) : new Date()),
    print: () => undefined,
  });
  let value = vm.runInContext(source, ctx, { timeout: 2000 });
  if (value instanceof ArrayCursor) value = value.toArray();
  return { result: plain(value), db: mock };
}

export function readCollection(db: MockDb, name: string): Doc[] {
  return plain(db.collections[name] ?? []);
}
