A **form** collects what the user types. Angular has two styles. **Template-driven forms** keep most of the setup in the HTML and are good for small forms.

## The pieces

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  template: `
    <form #f="ngForm" (ngSubmit)="save()">
      <input name="studentName" [(ngModel)]="name" required />
      <button [disabled]="f.invalid">Save</button>
    </form>
    <p>Typed: {{ name }}</p>
  `,
})
export class SignupComponent {
  name = '';

  save() {
    console.log('Saving', this.name);
  }
}
```

- `FormsModule` supplies `ngModel` and `ngForm`. Standalone components list it in `imports`.
- `[(ngModel)]="name"` is **two-way binding**. The "banana in a box" `[( )]` combines property binding and event binding: typing changes `name`, and changing `name` changes the box.
- Inside a form each control needs a `name` attribute so Angular can register it.
- `required` is a normal HTML attribute that Angular turns into a validation rule.
- `#f="ngForm"` gives a template variable that represents the whole form. `f.invalid` is true while a rule fails, and `f.valid` the opposite.
- `(ngSubmit)` runs when the form is submitted, for example by pressing Enter or the button.

## Why this matters

Sign-up, login and search forms appear in almost every app. For bigger forms with many rules, use the reactive style in the next lesson.
