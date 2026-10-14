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
  `,
})
export class SignupComponent {
  name = '';

  save() {
    console.log('Saving', this.name);
  }
}
