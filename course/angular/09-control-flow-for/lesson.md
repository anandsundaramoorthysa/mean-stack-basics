To show a list of things (students, products, messages), use the **@for** block. It repeats its contents once for each item.

```ts
@Component({
  selector: 'app-student-list',
  template: `
    <ul>
      @for (s of students; track s.id) {
        <li>{{ $index + 1 }}. {{ s.name }}</li>
      } @empty {
        <li>No students</li>
      }
    </ul>
  `,
})
export class StudentListComponent {
  students = [
    { id: 1, name: 'Asha' },
    { id: 2, name: 'Ravi' },
  ];
}
```

## The parts of the header

- `s of students` creates a variable `s` for the current item, taken from the array `students`.
- `track s.id` is **required**. It tells Angular a unique value for each item. When the list changes, Angular uses it to reuse existing elements instead of rebuilding everything. Use a unique `id` if you have one. `track item` (the item itself) is a fallback for when nothing better exists, and `track $index` suits lists that never change.

## Helpers inside the loop

`$index` is the position (from 0). There are also `$first`, `$last`, `$even`, `$odd` and `$count`.

## @empty

An optional `@empty` block runs when the list has no items. It saves you from writing a separate `@if` for the empty case.

## Why this matters

Tables, menus, cards and search results are all lists. `@for` with `track` is the pattern you will write most often.
