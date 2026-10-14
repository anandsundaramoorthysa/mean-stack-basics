Angular builds a page from **components**. A component is a TypeScript class that holds data and logic, paired with an HTML **template** that shows it.

## A minimal component

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<h1>Hello {{ name }}</h1>`,
})
export class GreetingComponent {
  name = 'Angular';
}
```

- `@Component({...})` is a **decorator**. It marks the class as a component and gives it settings.
- `selector` is the tag you write in another template to place this component: `<app-greeting></app-greeting>`.
- `template` is the HTML to show. `{{ name }}` is an **interpolation**: Angular replaces it with the value of `name` from the class.
- The class holds the data. Showing a different name is a matter of changing what `name` holds. For the page to refresh automatically in current Angular, changing data is done with signals (lesson 7) or inside an event handler (lesson 6).

## Standalone by default

In current Angular, components are **standalone** by default. You import what a component needs directly in the component, and you do not need an NgModule for a new app.

## Why this matters

Every Angular screen is built from small components like this one, nested inside each other.
