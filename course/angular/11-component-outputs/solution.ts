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
