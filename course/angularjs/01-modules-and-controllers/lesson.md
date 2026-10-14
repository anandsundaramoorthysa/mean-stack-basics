## Before you start: AngularJS is end-of-life

AngularJS (version 1.x) stopped receiving support in January 2022. This track exists for learners whose courses or existing codebases still use it. If you are starting a new project, use the **Angular** track instead. Lesson 6 shows how every idea here maps to modern Angular, so nothing you learn is wasted.

## Modules

An AngularJS app is organised into **modules**. A module is a named container for your app's code.

```js
angular.module('studentApp', []);
```

The second argument, `[]`, lists other modules this one depends on. It is empty for now. Always pass it when creating a module. Without it, AngularJS tries to look up an existing module instead.

## Controllers

A **controller** is a function that prepares data for one part of the page. Register it on the module:

```js
angular.module('studentApp', [])
  .controller('MainController', function ($scope) {
    $scope.title = 'My Students';
  });
```

`$scope` is an object AngularJS hands to your controller. Anything you store on it, such as `$scope.title`, can be shown in the HTML.

## Connecting HTML

```html
<div ng-app="studentApp" ng-controller="MainController">
  <h1>{{ title }}</h1>
</div>
```

- `ng-app` names the module and marks where AngularJS takes over the page.
- `ng-controller` attaches the controller to this element and everything inside it.
- `{{ title }}` shows the value of `$scope.title`. Lesson 2 explains this in detail.

The page also needs the AngularJS script file loaded with a `<script>` tag before your own code.
