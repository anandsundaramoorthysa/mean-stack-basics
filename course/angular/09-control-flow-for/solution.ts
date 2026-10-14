import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  template: `
    <ul>
      @for (s of students; track s.id) {
        <li>{{ $index + 1 }}. {{ s.name }}</li>
      } @empty {
        <li>No students</li>
      }
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
