import { ApplicationConfig, Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-student',
  template: `<p>Student number</p>`,
})
export class StudentComponent {}

export const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [],
};
