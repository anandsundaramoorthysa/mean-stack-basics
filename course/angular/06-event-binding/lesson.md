A page that cannot react is just a poster. **Event binding** connects something the user does (click, key press, typing) to code in your class.

## Parentheses mean an event

```ts
@Component({
  selector: 'app-vote',
  template: `
    <button (click)="vote()">Vote</button>
    <p>Votes: {{ votes }}</p>
  `,
})
export class VoteComponent {
  votes = 0;

  vote() {
    this.votes++;
  }
}
```

- `(click)="vote()"` means "when the button is clicked, run `vote()` from the class".
- Inside the method, `this.votes` is the property of the component.
- After the method runs, Angular refreshes the page text.

Remember the brackets: `[ ]` sends data *into* the template, `( )` sends events *out* of it.

## The event object

You can pass `$event` to learn details:

```html
<input (input)="onType($event)" />
```

```ts
onType(event: Event) {
  const box = event.target as HTMLInputElement;
  console.log(box.value);
}
```

Key events can be filtered: `(keyup.enter)="save()"` runs only when Enter is pressed.

## Why this matters

Every button, form and menu in your app is an event binding calling a method.
