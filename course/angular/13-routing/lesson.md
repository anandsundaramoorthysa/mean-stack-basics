A single-page app shows different screens without reloading the browser. The **router** decides which component to show for each URL.

## Defining routes

A route is an object that links a **path** to a component:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: '**', redirectTo: '' },
];
```

- `path: ''` is the home page.
- `:id` is a **route parameter**: a placeholder for whatever is in that part of the URL. `/students/7` gives `id` the text `'7'`.
- `**` matches anything that no earlier route matched. Angular tries routes in order, so keep it last.

## Turning the router on

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
```

`provideRouter` is a standalone-style setup function: no module needed.

## Showing and linking

Put `<router-outlet />` in your root template, where routed components appear. Link with `routerLink`:

```html
<a routerLink="/students/7">Student 7</a>
```

(Add `RouterOutlet` and `RouterLink` to the component's `imports`.)

## Reading the parameter

`withComponentInputBinding()` lets the parameter arrive as an input:

```ts
export class StudentComponent {
  id = input.required<string>();
}
```

You can also `inject(ActivatedRoute)` for the same information. Route parameters are always strings; convert with `Number(...)` if you need a number.

## Why this matters

Every multi-page Angular app is routes, links and a router-outlet.
