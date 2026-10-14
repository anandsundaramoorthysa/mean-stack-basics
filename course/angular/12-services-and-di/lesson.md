If two components need the same list of students, copying the code into both is a bad idea. A **service** is a class that holds shared data or logic. Angular creates it and hands it to whoever asks. This handing-out is called **dependency injection** (DI).

## Writing a service

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students = ['Asha', 'Ravi', 'Meena'];

  getAll(): string[] {
    return this.students;
  }
}
```

- `@Injectable` tells Angular the class can be injected.
- `providedIn: 'root'` means one shared instance for the whole app.

## Using it with inject()

```ts
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-student-list',
  template: `...`,
})
export class StudentListComponent {
  private service = inject(StudentService);
  names = this.service.getAll();
}
```

`inject(StudentService)` asks Angular for the instance. Do not write `new StudentService()`: you would get a private copy, and Angular could not share or replace it (for example with a fake one in a test).

Place the `inject` field before any field that uses it.

## Why this matters

Most real Angular apps keep data and server calls in services and keep components thin. Routing, HTTP and forms all arrive as services you `inject()`.
