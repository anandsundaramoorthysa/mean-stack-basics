import { Component } from '@angular/core';

@Component({
  selector: 'app-vote',
  template: `
    <button>Vote</button>
    <button>Reset</button>
    <p>Votes: {{ votes }}</p>
  `,
})
export class VoteComponent {
  votes = 0;

  // Write the methods vote() and reset() here.
}
