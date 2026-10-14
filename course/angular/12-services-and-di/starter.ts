import { Component } from '@angular/core';

export class StudentService {
  private students = ['Asha', 'Ravi', 'Meena'];

  getAll(): string[] {
    return [];
  }
}

@Component({
  selector: 'app-student-list',
  template: `
    <ul>
      @for (n of names; track n) {
        <li>{{ n }}</li>
      }
    </ul>
  `,
})
export class StudentListComponent {
  names: string[] = [];
}
