import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  marks: number;
}

@Component({
  selector: 'app-student-filter',
  imports: [FormsModule],
  template: `
    <h2>Students</h2>
    <input [(ngModel)]="query" placeholder="Search by name" />
    <p>Showing {{ filtered().length }} of {{ students().length }}</p>
    <ul>
      @for (s of filtered(); track s.id) {
        <li>
          {{ s.name }} ({{ s.marks }})
          @if (s.marks >= 40) {
            <strong>Pass</strong>
          } @else {
            <strong>Fail</strong>
          }
        </li>
      } @empty {
        <li>No students found</li>
      }
    </ul>
  `,
})
export class StudentFilterComponent {
  students = signal<Student[]>([
    { id: 1, name: 'Asha', marks: 82 },
    { id: 2, name: 'Ravi', marks: 35 },
    { id: 3, name: 'Meena', marks: 64 },
  ]);

  query = signal('');

  filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.students().filter((s) => s.name.toLowerCase().includes(q));
  });
}
