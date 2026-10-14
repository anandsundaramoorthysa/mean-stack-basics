import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <form>
      <input />
      <input type="password" />
      <button>Log in</button>
    </form>
  `,
})
export class LoginComponent {
  submit() {
    console.log('submit');
  }
}
