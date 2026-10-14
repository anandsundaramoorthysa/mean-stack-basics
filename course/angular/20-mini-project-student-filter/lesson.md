Time to combine what you have learned. You will finish a small app: a list of students with a search box. The pieces you need are all from earlier lessons.

## The plan

1. Keep the data in a **signal**: `students`.
2. Keep what the user typed in another signal: `query`.
3. Compute the visible list from both: `filtered = computed(...)`.
4. Show the list with `@for`, with `@empty` for no matches.
5. Show a badge with `@if` and `@else`.
6. Connect the search box with `[(ngModel)]` (this needs `FormsModule`).

## Filtering with computed

```ts
filtered = computed(() => {
  const q = this.query().toLowerCase();
  return this.students().filter((s) => s.name.toLowerCase().includes(q));
});
```

Lowercasing both sides makes the search ignore capital letters. `includes('')` is true for every string, so an empty search shows everyone. Because `filtered` reads `this.query()` and `this.students()`, Angular recalculates it whenever either one changes.

## Two-way binding with a signal

`[(ngModel)]="query"` works with a writable signal: typing calls `query.set(...)` for you, and you read it elsewhere as `query()`.

## A checklist before you start

- The imports line: `computed` and `signal` from `@angular/core`, `FormsModule` from `@angular/forms`.
- The template uses `filtered()` in the loop, not `students()`.
- Remember the parentheses when reading signals.

Take it one step at a time and run the checks as you go.
