import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>{{ count }} doubled is {{ doubled }}</p>
    <button (click)="increment()">+1</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  count = 0;

  increment() {}

  reset() {}
}
