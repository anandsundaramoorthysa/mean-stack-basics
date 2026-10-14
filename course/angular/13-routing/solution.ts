import { ApplicationConfig, Component, input } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-student',
  template: `<p>Student number {{ id() }}</p>`,
})
export class StudentComponent {
  id = input.required<string>();
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
