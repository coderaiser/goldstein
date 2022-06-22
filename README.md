# Goldstein [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/goldstein "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/goldstein.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/goldstein/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/goldstein/workflows/Node%20CI/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/coderaiser/goldstein?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/goldstein/badge.svg?branch=master&service=github

> *"You haven't a real appreciation of Newspeak, Winston," he said almost sadly. "Even when you write it you're still thinking in Oldspeak. I've read some of those pieces that you write in The Times occasionally. They're good enough, but they're translations. In your heart you'd prefer to stick to Oldspeak, with all its vagueness and its useless shades of meaning. You don't grasp the beauty of the destruction of words. Do you know that Newspeak is the only language in the world whose vocabulary gets smaller every year?"*
>
> *(c) “1984”, George Orwell*

JavaScript with no limits.

Language ruled by the users, [create an issue](https://github.com/coderaiser/goldstein/issues/new/choose) with ideas of a new language construction and what is look like in JavaScript, and most likely we implement it :).

## Install

```
npm i goldstein -g
```

## CLI

```
$ cat > 1.gs
export fn hello() {
    return 'world';
}

$ gs 1.gs
$ cat 1.js
// ~1.js
function hello() {
  return "world";
}
export {
  hello
};
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
`;
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

### `safe`

Applies [`tryCatch`](https://github.com/coderaiser/try-catch):

```gs
safe hello(1, 2, 3);
```

Is the same as:

```js
import tryCatch from 'try-catch';
tryCatch(1, 2, 3);
```

and

```gs
safe await hello(1, 2, 3);
```

Is the same as:

```js
import tryToCatch from 'try-catch';
await tryToCatch(1, 2, 3);
```

## How to contribute?

Clone the registry, create a new keyword with a prefix `keyword-`, then create directory `fixture` and put there two files with extensions `.js` and `.gs`. Half way done 🥳!

Then goes test and implementation in `index.js` and `index.spec.js` accordingly. Use scripts:

- `npm test`
- `UPDATE=1 npm test` - update `fixtures`;
- `AST=1 npm test` - log `AST`;
- `npm run coverage`;
- `npm run fix:lint`;

Update docs and make PR, that's it!

## License

MIT
