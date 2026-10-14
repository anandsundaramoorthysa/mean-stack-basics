AngularJS ended support in January 2022, but almost every idea you have learned lives on in modern Angular with a cleaner shape. Here is a translation table.

| AngularJS | Modern Angular |
|---|---|
| Module and `ng-app` | A standalone app started from a root component |
| Controller plus its HTML | A **component**: a class with a template and a selector |
| `$scope.title = '...'` | A class field, for example `title = '...'`, or a signal |
| `{{ title }}` | `{{ title }}` (still interpolation) |
| `ng-model` | Forms features such as `[(ngModel)]` (template-driven) or reactive forms |
| `ng-repeat="s in students"` | `@for (s of students; track s.id) { ... }` |
| `ng-if` / `ng-show` | `@if (...) { ... }` or a bound `hidden` property |
| `ng-click="save()"` | `(click)="save()"` |
| `ng-class` | `[class.out]="!item.inStock"` or `[ngClass]` |
| Filters (`uppercase`, `currency`) | **Pipes** (`uppercase`, `currency`) |
| Factory and `$http` | An injectable service using `HttpClient` |
| Dependency injection by parameter name | Dependency injection with `inject()` or a typed constructor |

## What changed in spirit

- **Components, not scopes.** Each component owns its data. There is no shared scope tree where any child can change a parent's values.
- **Typed code.** Modern Angular uses TypeScript, so many mistakes show up in your editor before you run anything.
- **Signals.** A signal is a value that tells Angular when it changes, so updates are precise and easy to follow. Signals let Angular update only what depends on them. This is a big change from the **digest cycle**, AngularJS's habit of re-checking every binding on the page after each event to find what changed.
- **Clearer syntax.** Square brackets bind properties, parentheses listen to events, and `@if` and `@for` read like ordinary code.

## What to do next

If you maintain an AngularJS app, migrate gradually: new screens as Angular components, shared logic as services. If you are learning from scratch, go to the Angular track. The ideas from this track, modules of code, data shown in templates, directives that repeat and hide, and injected services, will make it feel familiar.
