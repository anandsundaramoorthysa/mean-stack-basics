A **regular expression** (regex) is a short pattern that describes a shape of text, such as "exactly ten digits" or "letters, then an @ sign". You write it between slashes.

```js
const pattern = /\d+/;
```

## Building blocks

| Piece | Meaning |
|---|---|
| `\d` | one digit (0 to 9) |
| `\w` | one letter, digit or underscore |
| `\s` | one whitespace character |
| `.` | any single character except a line break (a literal dot is `\.`) |
| `[abc]` | one of a, b or c |
| `[a-z]` | one lowercase letter |
| `+` | one or more of the previous thing |
| `*` | zero or more |
| `?` | optional (zero or one) |
| `{3}` | exactly 3 (also `{2,4}` for 2 to 4) |
| `^` and `$` | start and end of the text |

`^\d{10}$` therefore means "start, ten digits, end". Without the anchors, a pattern may match just a piece of the text.

## Using a pattern

```js
/^\d{10}$/.test('9876543210');          // true: does it match?
'a1b22'.match(/\d+/g);                  // ['1', '22']: find all
'a  b'.replace(/\s+/g, ' ');            // 'a b': replace
```

- **Flags** go after the closing slash. `g` finds all matches, `i` ignores case.
- `match` with `g` returns an array of strings, or `null` when nothing matches. Protect against that with `?? []`.
- Special characters like `.` `+` `?` `(` need a backslash when you mean the character itself.

## Tips

- Start simple and test your pattern on several examples, both good and bad.
- Regexes are great for quick checks, but for something like real email validation, do not try to be perfect. A simple check plus sending a confirmation email works better.
- Between slashes one backslash is enough: `/\d+/`. Inside a normal string you would have to double it (`'\\d+'`), because the backslash is special in strings.
