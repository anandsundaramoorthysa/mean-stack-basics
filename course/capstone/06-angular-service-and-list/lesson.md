Now the browser side. Angular should fetch the students from your API and show them. Two pieces do this job: a **service** that talks to the server, and a **component** that displays the result.

## A service with HttpClient

A **service** is a class that holds logic you want to share. Angular creates one instance and gives it to anyone who asks.

```ts
@Injectable({ providedIn: 'root' })
export class StudentsService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Student[]>('http://localhost:3000/students');
  }
}
```

- `@Injectable({ providedIn: 'root' })` makes the service available everywhere.
- `inject(HttpClient)` asks Angular for the tool that sends HTTP requests.
- `http.get<Student[]>(url)` describes a GET request. It returns an **Observable**, which does nothing until someone calls `subscribe`. The `<Student[]>` part tells TypeScript the shape of the answer.

In Angular 21 and later, `HttpClient` can be injected without any setup. In older versions, `provideHttpClient()` must be listed in `providers` of `app.config.ts`, and in any version you add it there when you want to configure the client (for example with interceptors). That file is part of the project Angular generates, not of this exercise.

This lesson is checked as text only. The course does not run Angular. To see it work, create a project with `ng new`, put the service and component in it, add `provideHttpClient()` if your Angular version needs it, and keep your API running (lesson 7).

## A component with a signal

```ts
export class StudentListComponent {
  private service = inject(StudentsService);
  students = signal<Student[]>([]);

  constructor() {
    this.service.getAll().subscribe((list) => this.students.set(list));
  }
}
```

In a real project the component class also needs `@Component({ selector, template })` above it, as in the exercise. A **signal** holds a value that the template watches. Read it by calling it, `students()`, and change it with `.set(...)`. When the server answers, `set` runs and the page updates by itself.

## Listing with @for

```html
@for (student of students(); track student.id) {
  <li>{{ student.name }}</li>
}
```

`track` tells Angular which value identifies each item, so it can update the list efficiently. Use the `id`.
