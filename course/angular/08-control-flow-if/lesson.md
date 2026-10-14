Pages often need to show something only in some situations: a welcome message after login, an error when a field is empty. Angular's built-in **control flow** does this with blocks that start with `@`.

## @if, @else if, @else

```ts
@Component({
  selector: 'app-result',
  template: `
    @if (marks >= 75) {
      <p>Distinction</p>
    } @else if (marks >= 40) {
      <p>Pass</p>
    } @else {
      <p>Fail</p>
    }
  `,
})
export class ResultComponent {
  marks = 62;
}
```

- The condition goes in parentheses after `@if`.
- The HTML inside the braces is created only when the condition is true. When it is false, that HTML is not in the page at all (it is not just hidden).
- `@else if` and `@else` are optional and follow the closing brace.
- The condition can be any expression. For a signal write `@if (user())`.

## You will see *ngIf

Older tutorials use `*ngIf="condition"` and `*ngFor`. The Angular API docs mark `NgIf` as deprecated since v20 ("Use the @if block instead"), with removal planned for a future major release. Write the `@` blocks in new code.

## Why this matters

Most real screens switch between states: loading, error, empty, loaded. `@if` is how you express that.
