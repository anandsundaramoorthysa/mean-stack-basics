import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<p>{{ seconds() }} seconds</p>`,
})
export class ClockComponent {
  seconds = signal(0);
  private timerId: ReturnType<typeof setInterval> | undefined;
}
