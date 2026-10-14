A **directive** is a special attribute that teaches HTML new behaviour. You have already met `ng-app`, `ng-controller` and `ng-model`. Here are the ones you will use most.

## Repeating: ng-repeat

```html
<ul>
  <li ng-repeat="student in students">{{ student.name }}</li>
</ul>
```

AngularJS makes one `<li>` per item in `$scope.students`. The text before `in` is a name you choose for the current item.

## Showing and hiding

```html
<p ng-if="students.length === 0">No students yet</p>
<p ng-show="visible">Details</p>
```

- `ng-if` adds the element to the page or removes it completely.
- `ng-show` keeps the element and just hides it with CSS. Prefer it for parts that flip often.

## Reacting to clicks: ng-click

```html
<button ng-click="visible = !visible">Toggle</button>
<button ng-click="remove()">Remove</button>
```

The value is an expression. It can change a scope value directly or call a function you defined on `$scope`.

## Styling: ng-class

```html
<li ng-class="{ out: !item.inStock, special: item.price > 100 }">
```

Give `ng-class` an object. A class name is added when its condition is true and removed when it is false.

## Putting it together

The controller supplies data and functions:

```js
$scope.items = [{ name: 'Pen', inStock: true }];
$scope.toggle = function () { $scope.show = !$scope.show; };
```

The template uses directives to display and drive them. Notice that you never touch the page with JavaScript: you describe it, and AngularJS keeps it up to date.
