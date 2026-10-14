Inputs carry data down. When a child needs to say "something happened", it uses an **output**, which carries an event up to the parent.

## The child declares and emits

```ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `<button (click)="rate(5)">Give 5 stars</button>`,
})
export class RatingComponent {
  rated = output<number>();

  rate(stars: number) {
    this.rated.emit(stars);
  }
}
```

- `output<number>()` creates an event that carries a number. The type in angle brackets is the type of the value.
- `emit(value)` fires the event.

## The parent listens

```ts
@Component({
  selector: 'app-root',
  imports: [RatingComponent],
  template: `
    <app-rating (rated)="onRated($event)" />
    <p>Last rating: {{ lastRating }}</p>
  `,
})
export class AppComponent {
  lastRating = 0;

  onRated(stars: number) {
    this.lastRating = stars;
  }
}
```

The listener looks like any event binding, with parentheses. `$event` is the value passed to `emit`.

## Why this matters

With inputs down and outputs up, each component stays small and in charge of its own job. The parent decides what to do with the event: save it, filter a list, delete a row.
