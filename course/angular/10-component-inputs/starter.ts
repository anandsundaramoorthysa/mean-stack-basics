import { Component } from '@angular/core';

@Component({
  selector: 'app-student-badge',
  template: `<p>{{ name }}: {{ score }}</p>`,
})
export class StudentBadgeComponent {
  name = '';
  score = 0;
}

@Component({
  selector: 'app-root',
  template: `<p>Add the badge here</p>`,
})
export class AppComponent {}
