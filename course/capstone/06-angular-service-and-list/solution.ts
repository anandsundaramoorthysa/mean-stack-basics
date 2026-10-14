import { Component, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Student {
  id: number;
  name: string;
  department: string;
  marks: number;
}

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Student[]>('http://localhost:3000/students');
  }
}

@Component({
  selector: 'app-student-list',
  template: `
    <h2>Students</h2>
    <ul>
      @for (student of students(); track student.id) {
        <li>{{ student.name }} ({{ student.department }}): {{ student.marks }}</li>
      } @empty {
        <li>No students yet.</li>
      }
    </ul>
  `,
})
export class StudentListComponent {
  private service = inject(StudentsService);
  students = signal<Student[]>([]);

  constructor() {
    this.service.getAll().subscribe((list) => this.students.set(list));
  }
}
