**Reactive forms** describe the form as objects in the class. They are the better choice when a form has many fields, rules that depend on each other, or needs testing.

## Building the model

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" />
      <input type="password" formControlName="password" />
      <button [disabled]="form.invalid">Log in</button>
    </form>
  `,
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    console.log(this.form.value);
  }
}
```

- A **FormControl** holds the value and status of one field. The first argument is the start value, the second a list of **validators**.
- A **FormGroup** collects controls under names.
- `[formGroup]="form"` attaches the template to the group, and `formControlName="email"` attaches an input to the control with that name.
- `form.invalid` is true while any validator fails. `form.value` is an object like `{ email: '...', password: '...' }`.

To show a message for one field, check its control, for example `form.controls.email.errors` or `form.controls.email.touched`.

## Why this matters

Reactive forms keep the rules in TypeScript, where you can read, reuse and test them.
