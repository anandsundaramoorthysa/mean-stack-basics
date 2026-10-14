In lesson 1 you put data on `$scope`. Now you will show it and let the user change it.

## Expressions

An **expression** is a small piece of code written between double curly braces. AngularJS evaluates it against the scope and puts the result into the page.

```html
<p>{{ title }}</p>
<p>{{ 2 + 3 }}</p>
<p>{{ student.name }}</p>
```

Expressions can read properties, do arithmetic and call functions. They cannot contain loops, `if` statements or variable declarations. The only conditional allowed is the ternary operator, `a ? b : c`. If an expression refers to something missing, AngularJS shows nothing instead of crashing.

## Two-way binding with ng-model

`ng-model` connects an input to a scope property.

```html
<div ng-app ng-init="price = 20; quantity = 3">
  <input type="text" ng-model="name">
  <p>Hello, {{ name }}</p>
</div>
```

Type in the box and the paragraph updates on every key press. This is **two-way data binding**: the model (the scope data) updates the view, and the view updates the model. You wrote no event handling at all.

`ng-init` sets starting values straight in the HTML. It is fine for small demos, but real apps set data in a controller.

## Why this matters

Two-way binding is the feature that made AngularJS famous. It is also why it can be hard to follow in big apps, because any part of the page can change any value. Modern Angular keeps the idea of binding but makes data flow easier to trace.
