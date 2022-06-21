# Goldstein

> *"You haven't a real appreciation of Newspeak, Winston," he said almost sadly. "Even when you write it you're still thinking in Oldspeak. I've read some of those pieces that you write in The Times occasionally. They're good enough, but they're translations. In your heart you'd prefer to stick to Oldspeak, with all its vagueness and its useless shades of meaning. You don't grasp the beauty of the destruction of words. Do you know that Newspeak is the only language in the world whose vocabulary gets smaller every year?"*
> 
> *(c) “1984”, George Orwell*

JavaScript with no limits.

Language ruled by the users, [create an issue](https://github.com/coderaiser/goldstein/issues/new/choose) with ideas of a new language construction and what is look like in JavaScript, and most likely we implement it :).

## Install

```
npm i goldstein
```

## API

```js
import {compile} from 'goldstein';

compile(`
    fn hello() {
        guard (text !== "world") else {
            return ""
        }

        return "Hello " + text
    }
`);
// returns
`
function hello() {
    if (!(text !== 'world')) {
        return '';
    }

    return 'Hello ' + text;
}
`
```

## Keywords

**Goldstein** is absolutely compatible with JavaScript, and it has extensions.
Here is the list.

### `fn`

You can use `fn` to declare a `function`:

```gs
fn hello() {
    return 'world';
}
```

This is the same as:

```js
function hello() {
    return 'world';
}
```

### `guard`

Applies not to `IfCondition`:

```gs
fn hello() {
    guard (text !== "world") else {
        return ""
    }

    return "Hello " + text
}
```

Is the same as:

```js
function hello() {
    if (!(text !== 'world')) {
        return '';
    }

    return 'Hello ' + text;
}
```

## How to contribute?

Clone the registry, create a new keyword with a prefix `keyword-`, then create directory `fixture` and put there two files with extensions `.js` and `.gs`. Half way done 🥳!

Then goes test and implimentation in `index.js` and `index.spec.js` accordingly. Use scripts:
- `npm test`;
- `npm run coverage`;
- `npm run fix:lint`;

Update docs and make PR, that's it!

## License

MIT
