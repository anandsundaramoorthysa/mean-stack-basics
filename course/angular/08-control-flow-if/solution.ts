import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  template: `
    @if (marks >= 75) {
      <p>Distinction</p>
    } @else if (marks >= 40) {
      <p>Pass</p>
    } @else {
      <p>Fail</p>
    }
  `,
})
export class ResultComponent {
  marks = 62;
}
