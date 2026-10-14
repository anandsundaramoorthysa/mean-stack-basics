import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `<button>Give 5 stars</button>`,
})
export class RatingComponent {}

@Component({
  selector: 'app-root',
  template: `
    <p>Last rating: {{ lastRating }}</p>
  `,
})
export class AppComponent {
  lastRating = 0;
}
