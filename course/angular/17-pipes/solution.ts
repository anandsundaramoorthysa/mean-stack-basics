import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, PercentPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, PercentPipe],
  template: `
    <p>{{ name | uppercase }}</p>
    <p>{{ fee | currency:'INR' }}</p>
    <p>{{ joined | date:'dd MMM yyyy' }}</p>
    <p>{{ ratio | percent }}</p>
  `,
})
export class ReportComponent {
  name = 'Asha';
  fee = 1500;
  joined = new Date(2025, 5, 15);
  ratio = 0.756;
}
