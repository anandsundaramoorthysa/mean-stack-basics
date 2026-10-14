import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `<input [(ngModel)]="name" /> {{ name }}`,
})
export class AppComponent {
  name = '';
}

bootstrapApplication(AppComponent);
