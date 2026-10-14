Real apps load data from a server. In AngularJS you do that with **services**, objects that hold shared logic, and the built-in `$http` service.

## Dependency injection

Look at a controller you wrote earlier:

```js
.controller('MainController', function ($scope) { ... })
```

You never created `$scope`. You listed its name as a parameter and AngularJS supplied it. This is **dependency injection**: a function states what it needs, and the framework provides it. You can ask for several things at once, for example `function ($scope, $http)`.

## Calling a server with $http

```js
$http.get('/api/students').then(function (response) {
  $scope.students = response.data;
});
```

`$http.get` sends the request and returns a **promise**, an object that will hold the answer later. `.then` registers a function to run when the answer arrives. The reply body is in `response.data`. When you assign it to `$scope`, the page updates by itself.

## Your own service with a factory

Calling `$http` inside every controller would repeat code. Wrap it in a **factory**:

```js
angular.module('studentApp')
  .factory('StudentService', function ($http) {
    return {
      getAll: function () {
        return $http.get('/api/students');
      }
    };
  });
```

A factory is a function that returns the object other code will use. AngularJS creates it once and shares it. Any controller can now ask for `StudentService` by name:

```js
.controller('ListController', function ($scope, StudentService) {
  StudentService.getAll().then(function (response) {
    $scope.students = response.data;
  });
});
```

One tip: `angular.module('studentApp')` with no second argument means "find the existing module". Only pass `[]` when you create it.

This pattern, a small class that fetches data and is handed to whoever needs it, carries straight over to modern Angular.
