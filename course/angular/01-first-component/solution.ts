import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<h1>Hello {{ name }}</h1>`,
})
export class GreetingComponent {
  name = 'Angular';
}
