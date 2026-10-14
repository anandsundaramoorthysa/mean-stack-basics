import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  template: `
    <ul>
      <!-- Write the @for block here -->
    </ul>
  `,
})
export class StudentListComponent {
  students = [
    { id: 1, name: 'Asha' },
    { id: 2, name: 'Ravi' },
    { id: 3, name: 'Meena' },
  ];
}
