# 🤫Goldstein [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/goldstein "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/goldstein.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/goldstein/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/goldstein/workflows/Node%20CI/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/coderaiser/goldstein?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/goldstein/badge.svg?branch=master&service=github

![image](https://user-images.githubusercontent.com/1573141/175353192-9867d3ba-beaf-46d5-adbc-e2eb736bfef1.png)

> *"You haven't a real appreciation of Newspeak, Winston," he said almost sadly. "Even when you write it you're still thinking in Oldspeak. I've read some of those pieces that you write in The Times occasionally. They're good enough, but they're translations. In your heart you'd prefer to stick to Oldspeak, with all its vagueness and its useless shades of meaning. You don't grasp the beauty of the destruction of words. Do you know that Newspeak is the only language in the world whose vocabulary gets smaller every year?"*
>
> *(c) “1984”, George Orwell*

JavaScript with no limits 🤫 with built-in JSX and TypeScript.
Language ruled by the users, [create an issue](https://github.com/coderaiser/goldstein/issues/new/choose) with ideas of a new language construction and what is look like in JavaScript, and most likely we implement it :).

## Install

```
npm i goldstein esbuild -g
```

## CLI

```
$ cat > 1.gs
export fn hello() {
    return 'world';
}

$ gs 1.gs
$ cat 1.js
function hello() {
    return "world";
}
export {
    hello,
};
```

Let's do a bit more!

```gs
const a = () => throw 'hello';

if a > 2 {
    log('hello');
}
```

Will give us:

```js
const a = () => {
    throw 'hello';
};

if (a > 2) {
    log('hello');
}
```

## API

### `compile(source)`

When you need to compile **Goldstein** to **JavaScript** use:

```js
import {compile} from 'goldstein';

compile(`
    fn hello() {
        guard text !== "world" else {
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

By default, all keywords mentioned in the next section used, but you can limit the list setting with `keywords` option.
You can add any keywords, and even create your own:

```js
import {compile, keywords} from 'goldstein';

const source = `
    fn hello() {
        return id('hello');
    }
`;

const {keywordFn} = keywords;

compile(source, {
    keywords: {
        ...keywords,
        keywordFn: null,
        keywordId(Parser) {
            const {keywordTypes} = Parser.acorn;
            
            return class extends Parser {};
        },
    },
    rules: {
        declare: ['on', {
            declarations: {
                id: 'const id = (a) => a',
            },
        }],
    },
});

// returns
`
const id = (a) => a;

function hello() {
    return id('hello');
}
`;
```

You can declare variables with [`@putout/operator-declare`](https://github.com/coderaiser/putout/tree/master/packages/operator-declare).

### `parse(source, {type, keywords})`

When you need to get **JavaScript** Babel AST use `parse`:

```js
import {parse} from 'goldstein';

parse(`
    fn hello() {
        guard text !== "world" else {
            return ""
        }
        
        return "Hello " + text
    }
`);

// returns Babel AST
```

You can parse to **ESTree**:

```js
const options = {
    type: 'estree',
};

parse(`
    fn hello() {
        guard text !== "world" else {
            return ""
        }
        
        return "Hello " + text
`, options);
```

### `print(ast)`

You can make any modifications to **Goldstein AST** and then `print` back to **Goldstein**:

```js
import {parse, print} from 'goldstein';

const ast = parse(`const t = try f('hello')`);
const source = print(ast);
```

### `convert(source)`

You can even convert **JavaScript** to **Goldstein** with:

```js
import {convert} from 'goldstein';

const ast = convert(`const t = tryCatch(f, 'hello')`);

// returns
`const t = try f('hello')`;
```

## Keywords

**Goldstein** is absolutely compatible with JavaScript, and it has extensions.
Here is the list.

### `fn`

You can use `fn` to declare a `function`:

```rust
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

### `append array`

Append new elements to an array just like in Swift:

```js
let a = [1];

a += [2, 3];
```

Is the same as:

```js
const a = [1];
a.push(...[2, 3]);
```

### `guard`

Applies not to `IfCondition`:

```swift
fn hello() {
    guard text !== "world" else {
        return ""
    }

    return "Hello " + text
}
```

Is the same as:

```js
function hello() {
    if (text === 'world') {
        return '';
    }
    
    return `Hello ${text}`;
}
```

### `try`

`try` can be used as an expression.

Applies [`tryCatch`](https://github.com/coderaiser/try-catch):

```gs
const [error, result] = try hello('world');
```

Is the same as:

```js
import tryCatch from 'try-catch';

const [error, result] = tryCatch(hello, 'world');
```

and

```gs
const [error, result] = try await hello('world');
```

Is the same as:

```js
import tryToCatch from 'try-catch';

const [error, result] = await tryToCatch(hello, 'world');
```

### [`operator-safe-assignment`](https://github.com/arthurfiorette/proposal-safe-assignment-operator)

You can use `?=` instead of [`try`](#try):

```gs
const [error, result] ?= hello('world');
```

Is the same as:

```js
import tryCatch from 'try-catch';

const [error, result] = tryCatch(hello, 'world');
```

and

```gs
const [error, result] ?= await hello('world');
```

Is the same as:

```js
import tryToCatch from 'try-catch';

const [error, result] = await tryToCatch(hello, 'world');
```

### `should`

`should` can be used as an expression (just like [`try`](https://github.com/coderaiser/goldstein/edit/master/README.md#try)).
This keyword is useful if you want to prevent a function call (also async) to throw an error because you don't need to have any result and the real execution is just optional (so runs if supported).

```gs
should hello()
```

Is the same as:

```gs
try hello();
```

> ☝️ *Warning: this feature can be helpful but also dangerous especially if you're debugging your application. In fact, this is made to be used as an optional function call (ex. should load content, but not necessary and knowing this feature is optional), if you call a function in this way while debugging, no error will be printed and the application will continue run as nothing happened.*

### `freeze`

You can use `freeze` instead of `Object.freeze()` like that:

```gs
freeze {
    'example': true
}
```

Is the same as:

```js
Object.freeze({
    example: true,
});
```

### `if`

You can omit parens. But you must use braces in this case.

```swift
if a > 3 {
    hello();
}
```

Also you can use `if let` syntax:

```swift
if let x = a?.b {
    print(x);
}
```

### `throw expression`

You can use [throw as expression](https://github.com/tc39/proposal-throw-expressions), just like that:

```js
const a = () => throw 'hello';
```

### `Curry`

Similar to [partial application](https://github.com/tc39/proposal-partial-application):

```gs
const sum = (a, b) => a + b;
const inc = sum~(1);

inc(5);
// returns
6
```

### `Import`

When you import `.gs` files during compile step it will be replaced with `.js`:

```gs
// hello.js
export const hello = () => 'world';

// index.js1
import hello from './hello.gs';
```

Will be converted to:

```js
// index.js
import hello from './hello.js';
```

Also, also supported:

```gs
import hello from hello;
```

And will be converted to:

```js
import hello from 'hello';
```

### `FunctionDeclaration` with `Arrow`

If you mistakenly put `=>` in function declaration:

```gs
function hello() => {
}
```

That absolutely fine, it will be converted to:

```js
function hello() {}
```

### Broken String

When you accidentally broke string, Goldstein will fix it:

```diff
-const a = 'hello
+const a = 'hello';
-const a = ‘hello world’;
+const a = 'hello world';
```

### Missing Initializer

Forget to add assignment (`=`), not problem!

```diff
-const {code, places} await samadhi(source);
+const {code, places} = await samadhi(source);
```

### Useless comma

Added useless comma (`,`)? no problem!

```diff
const a = {
-    b,,
+    b,
};
```

### Useless semicolon

Added useless semicolon (`;`)? no problem!

```diff
const a = {
-    b;
+    b,
};

const a = {
-    b(){},
+    b(){}
};
```

### Assign from

```gs
const a = from 'a';
```

The same as:

```js
const a = require('a');
```

### Export without `const`

```gs
export x = () => {};
```

The same as:

```js
export const x = () => {};
```

### Wrong brace `)`

```diff
-import a from 'a');
+import a from 'a';
```

## How to contribute?

Clone the registry, create a new keyword with a prefix `keyword-`, then create directory `fixture` and put there two files with extensions `.js` and `.gs`. Half way done 🥳!

Then goes test and implementation in `index.js1` and `index.spec.js` accordingly. Use scripts:

- `npm test`
- `UPDATE=1 npm test` - update `fixtures`;
- `AST=1 npm test` - log `AST`;
- `npm run coverage`;
- `npm run fix:lint`;

Update docs and make PR, that's it!

## License

MIT
