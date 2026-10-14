import { Component, Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students = ['Asha', 'Ravi', 'Meena'];

  getAll(): string[] {
    return this.students;
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
  private service = inject(StudentService);
  names = this.service.getAll();
}
