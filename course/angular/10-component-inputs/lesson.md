Components are meant to be reused. A **badge** component should show *any* student, so the data must come from outside. A child component receives data from its parent through **inputs**.

## Declaring inputs

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-student-badge',
  template: `<p>{{ name() }}: {{ score() }}</p>`,
})
export class StudentBadgeComponent {
  name = input.required<string>();
  score = input(0);
}
```

- `input.required<string>()` must be given by the parent.
- `input(0)` is optional and uses 0 when the parent says nothing.
- An input is a **signal** that you only read. In code and templates call it: `name()`.

## Using the child in a parent

```ts
@Component({
  selector: 'app-root',
  imports: [StudentBadgeComponent],
  template: `<app-student-badge name="Asha" [score]="82" />`,
})
export class AppComponent {}
```

- `imports` lists the components the template uses. Forget it and Angular reports an unknown element.
- Plain `name="Asha"` passes fixed text. `[score]="82"` passes the value of an expression, here a number.

## Why this matters

Inputs make components reusable. Data flows down from parents to children, and (next lesson) events flow back up.
