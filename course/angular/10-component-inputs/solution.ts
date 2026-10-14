import { Component, input } from '@angular/core';

@Component({
  selector: 'app-student-badge',
  template: `<p>{{ name() }}: {{ score() }}</p>`,
})
export class StudentBadgeComponent {
  name = input.required<string>();
  score = input(0);
}

@Component({
  selector: 'app-root',
  imports: [StudentBadgeComponent],
  template: `<app-student-badge name="Asha" [score]="82" />`,
})
export class AppComponent {}
