A component has a life: it is created, shown, updated and finally removed. **Lifecycle hooks** are methods that Angular calls at those moments.

## Common hooks

```ts
import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<p>{{ seconds() }} seconds</p>`,
})
export class ClockComponent implements OnInit, OnDestroy {
  seconds = signal(0);
  private timerId: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.timerId = setInterval(() => this.seconds.update((s) => s + 1), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
```

- `ngOnInit` runs once after Angular has set up the component and its inputs. Good for starting work such as timers or loading data.
- `ngOnDestroy` runs just before the component is removed. Clean up here: stop timers and cancel subscriptions.
- The constructor runs earlier, mainly to set up fields. Do not rely on inputs there.
- Others include `ngOnChanges` and `ngAfterViewInit`.

## effect(): react to signals

```ts
constructor() {
  effect(() => {
    console.log('seconds:', this.seconds());
  });
}
```

An **effect** always runs at least once, and again whenever a signal it reads changes. Use it for side effects: logging, saving to `localStorage`, custom DOM work. Angular advises against using an effect to pass state between signals when a `computed` would do. Effects must be created in an injection context, for example in the constructor.

## Why this matters

Cleaning up properly stops memory leaks, and effects connect signals to the outside world.
