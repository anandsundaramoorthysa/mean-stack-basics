import { Component, Injectable, inject, ApplicationConfig } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class StudentApi {
  private http = inject(HttpClient);

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>('/api/students', student);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
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
  students = toSignal(this.api.getAll(), { initialValue: [] });
}
