import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  marks: number;
}

@Component({
  selector: 'app-student-filter',
  template: `
    <h2>Students</h2>
    <ul>
      <li>Replace this with the list</li>
    </ul>
  `,
})
export class StudentFilterComponent {
  students = signal<Student[]>([
    { id: 1, name: 'Asha', marks: 82 },
    { id: 2, name: 'Ravi', marks: 35 },
    { id: 3, name: 'Meena', marks: 64 },
  ]);

  // Add query and filtered here.
}
