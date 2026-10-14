Time to combine what you have learned. You will style a profile card from a finished piece of HTML. There is no new syntax here, only decisions about order and detail.

## Plan before you type

Work from the outside in:

1. **Variables and page**: put colours in `:root`, then set the page background.
2. **The card**: width, centring, padding, background, rounded corners and shadow.
3. **Inside the card**: avatar, name, role, skills list.
4. **Details**: the button, its hover colour and the transition.

## Patterns you will need

Centre a block that has a maximum width:

```css
.card {
  max-width: 360px;
  margin: 40px auto;   /* auto splits the leftover side space */
}
```

Turn a list into a row of pills:

```css
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
}
.skills li {
  padding: 4px 12px;
  border-radius: 999px;   /* far larger than needed, so ends are fully round */
}
```

Reuse one colour everywhere through a variable:

```css
:root { --accent: #0057b8; }
.btn { background-color: var(--accent); }
```

## Working method

Save, press **Check My Code**, read the first failing item, fix it, repeat. Small steps beat writing everything at once. If a style seems ignored, look for a typo, a missing semicolon, or a more specific rule winning.

Once it passes, experiment: change `--accent`, make the avatar square, try `gap: 4px`. Seeing the effect of changes is how CSS becomes intuitive.
