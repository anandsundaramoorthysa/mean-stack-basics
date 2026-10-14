Plain properties are fine for fixed values, but Angular does not watch them. In current Angular (zoneless is the default from v21), changing a plain property by itself does not tell Angular to refresh the page. A **signal** is a value that Angular can watch, so it knows which part of the page uses it and updates only what changed.

## Creating and reading

```ts
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>{{ count() }} doubled is {{ doubled() }}</p>
    <button (click)="increment()">+1</button>
  `,
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update((c) => c + 1);
  }
}
```

- `signal(0)` makes a signal holding 0.
- You **read** a signal by calling it: `count()`. Forgetting the parentheses is the most common mistake.
- `set(value)` replaces the value. `update(fn)` computes the new value from the old one.

## Computed signals

`computed(() => ...)` builds a value from other signals. It recalculates by itself when they change, and you cannot set it directly. Use it instead of copying and updating values by hand.

## Why this matters

Signals are the modern way to hold changing data in Angular. Later lessons (inputs, the student filter project) build on them.
