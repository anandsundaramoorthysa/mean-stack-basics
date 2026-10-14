import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<p>{{ seconds() }} seconds</p>`,
})
export class ClockComponent implements OnInit, OnDestroy {
  seconds = signal(0);
  private timerId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    effect(() => {
      console.log('seconds:', this.seconds());
    });
  }

  ngOnInit() {
    this.timerId = setInterval(() => this.seconds.update((s) => s + 1), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
