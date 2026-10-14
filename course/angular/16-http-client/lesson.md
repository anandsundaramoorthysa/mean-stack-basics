Most apps load data from a server. Angular's **HttpClient** sends the requests. Keep it in a **service**, so components stay simple.

## Turning it on

From Angular 21, `HttpClient` can be injected without any setup. In older versions, and whenever you want to configure it (for example with interceptors), you add `provideHttpClient()` to the app configuration, as below.

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

## A service that calls the server

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentApi {
  private http = inject(HttpClient);

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
  }

  add(student: Student) {
    return this.http.post<Student>('/api/students', student);
  }
}
```

- `get<Student[]>(url)` sends a GET request. The type tells TypeScript what the reply looks like (it only tells the compiler what to expect and is not checked at run time, so the server could still send something else).
- `post<Student>(url, body)` sends the `body` as JSON.

## Observables are lazy

These methods return an **Observable** from the RxJS library: a stream of values that does nothing until something subscribes. Two common ways:

```ts
// In a component: convert to a signal
students = toSignal(this.api.getAll(), { initialValue: [] });
// Or subscribe by hand
this.api.add(s).subscribe((saved) => console.log(saved));
```

`toSignal` (from `@angular/core/rxjs-interop`) subscribes for you and keeps the latest result in a signal. The template reads `students()` like any signal.

## Why this matters

Lists, logins and saves all talk to a server, and this is how.
