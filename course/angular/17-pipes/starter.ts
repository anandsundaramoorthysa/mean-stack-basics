import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `
    <p>{{ name }}</p>
    <p>{{ fee }}</p>
    <p>{{ joined }}</p>
    <p>{{ ratio }}</p>
  `,
})
export class ReportComponent {
  name = 'Asha';
  fee = 1500;
  joined = new Date(2025, 5, 15);
  ratio = 0.756;
}
