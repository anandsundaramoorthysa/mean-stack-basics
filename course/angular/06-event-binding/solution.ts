import { Component } from '@angular/core';

@Component({
  selector: 'app-vote',
  template: `
    <button (click)="vote()">Vote</button>
    <button (click)="reset()">Reset</button>
    <p>Votes: {{ votes }}</p>
  `,
})
export class VoteComponent {
  votes = 0;

  vote() {
    this.votes++;
  }

  reset() {
    this.votes = 0;
  }
}
