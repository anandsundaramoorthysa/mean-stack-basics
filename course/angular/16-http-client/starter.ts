import { Component, Injectable, inject, ApplicationConfig } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class StudentApi {
  getAll(): Observable<Student[]> {
    throw new Error('Not written yet');
  }

  add(student: Student): Observable<Student> {
    throw new Error('Not written yet');
  }
}

export const appConfig: ApplicationConfig = {
  providers: [],
};

@Component({
  selector: 'app-students',
  template: `
    <ul>
      @for (s of students(); track s.id) {
        <li>{{ s.name }}</li>
      }
    </ul>
  `,
})
export class StudentsComponent {
  private api = inject(StudentApi);
  students = [];
}
