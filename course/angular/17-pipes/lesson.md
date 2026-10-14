Data is often not in the form you want to show. A date is a long timestamp, a fee is just 1500. A **pipe** transforms a value for display, right in the template, without changing the data.

## Using a pipe

```ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  template: `
    <p>{{ name | uppercase }}</p>
    <p>{{ fee | currency:'INR' }}</p>
    <p>{{ joined | date:'dd MMM yyyy' }}</p>
  `,
})
export class ReportComponent {
  name = 'Asha';
  fee = 1500;
  joined = new Date(2025, 5, 15);
}
```

- Write the pipe name after `|`. Arguments follow colons: `currency:'INR'`.
- `uppercase`, `lowercase`, `titlecase` change text. `currency`, `percent`, `number` format numbers. `date` formats dates (the pattern letters are described on the DatePipe page). `json` prints an object, which is useful when debugging.
- Pipes can be chained: `{{ name | lowercase | titlecase }}`.
- Standalone components must list each pipe class they use in `imports`.

## Why this matters

Pipes keep formatting out of your data and your logic, and you can reuse them in every template.
