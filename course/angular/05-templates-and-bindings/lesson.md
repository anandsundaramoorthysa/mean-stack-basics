A component's **template** reads data from its class. Two kinds of **binding** do most of the work.

## Interpolation: data into text

```ts
@Component({
  selector: 'app-student-card',
  template: `<p>{{ name }} scored {{ marks + 5 }}</p>`,
})
export class StudentCardComponent {
  name = 'Asha';
  marks = 70;
}
```

`{{ ... }}` evaluates a small expression and puts the result into the text. You can call methods and do simple maths, but you cannot write statements such as `if` or assignments.

## Property binding: data into element properties

Square brackets connect an element **property** to an expression:

```html
<img [src]="photoUrl" [alt]="name" />
<button [disabled]="!active">Enroll</button>
```

- `[src]="photoUrl"` means "set the property `src` to the value of `photoUrl`".
- Without brackets, `src="photoUrl"` is just the fixed text `photoUrl`.
- `!active` flips true to false, so the button is disabled when `active` is false.

Whenever the class value changes, the page follows.

## Why this matters

Almost every dynamic page is some mix of these two bindings: text from `{{ }}`, and everything else (images, links, disabled state, CSS classes) through `[ ]`.
