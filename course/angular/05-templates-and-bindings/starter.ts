import { Component } from '@angular/core';

@Component({
  selector: 'app-student-card',
  template: `
    <h2>name</h2>
    <img src="photoUrl" alt="Student photo" />
    <button>Enroll</button>
  `,
})
export class StudentCardComponent {
  name = 'Asha';
}
