import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <form>
      <input />
      <button>Save</button>
    </form>
  `,
})
export class SignupComponent {
  name = '';

  save() {
    console.log('Saving', this.name);
  }
}
