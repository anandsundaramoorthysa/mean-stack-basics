Before standalone components arrived (Angular 14 as a preview, stable in Angular 15), every component had to belong to an **NgModule**, a class that grouped components, pipes and imports. Since Angular 19 **standalone components** are the default, and you should write them in new code. You still meet NgModules in older tutorials and company projects, so you should recognise them.

## The old way

```ts
@Component({
  selector: 'app-root',
  standalone: false,
  template: `<input [(ngModel)]="name" /> {{ name }}`,
})
export class AppComponent {
  name = '';
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

The component does not list what it needs. The module does, for every component it declares.

## The standalone way

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `<input [(ngModel)]="name" /> {{ name }}`,
})
export class AppComponent {
  name = '';
}

bootstrapApplication(AppComponent);
```

- The component lists its own `imports`.
- No module class is needed.
- `bootstrapApplication(root, config)` starts the app. The `config` carries app-wide providers such as `provideRouter(...)` and `provideHttpClient()`.

`standalone: true` is the default now. `standalone: false` appears only when a component must belong to a module.

## Why this matters

Standalone code is shorter and easier to follow. When you read an older project, translate each `declarations` and `imports` list into component-level `imports`.
