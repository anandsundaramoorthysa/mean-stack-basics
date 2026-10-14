## Filters

A **filter** changes how a value is displayed, without changing the value itself. You apply one with the pipe character `|`.

```html
<p>{{ city | uppercase }}</p>
<p>{{ price | currency }}</p>
<li ng-repeat="s in students | orderBy:'marks'">{{ s.name }}</li>
```

- `uppercase` turns text into capitals.
- `currency` adds a currency symbol and, by default, the usual number of decimals for the locale (two for most currencies). You can pass your own symbol and decimal count, such as `currency:'$':0`.
- `orderBy:'marks'` sorts a list by that property. Use `'-marks'` for highest first.

You can chain filters: `{{ name | uppercase | limitTo:5 }}`.

## Form validation

AngularJS watches every field in a form and keeps score. Give the form a `name` and the field a `name`, and the form appears on the scope.

```html
<form name="regForm">
  <input name="email" type="email" ng-model="email" required>
  <button ng-disabled="regForm.$invalid">Register</button>
</form>
```

- `required` (or `ng-required="true"`) says the field cannot be empty. `ng-required` is useful when the rule depends on an expression.
- `type="email"` makes AngularJS check that the text looks like an email address.
- `regForm.$valid` is true when every field passes. `regForm.$invalid` is the opposite.
- `ng-disabled` disables the button while its expression is true, so the learner cannot submit a bad form.

## Showing messages

You can also look at one field, for example `regForm.email.$error.required`, and use `ng-show` to display a message such as "Email is required". Combine what you learned in lesson 3 with these checks to build helpful forms.
