# @putout/plugin-goldstein [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-goldstein.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-goldstein "npm"

> JavaScript with no limits 🤫.
>
> (c) [**Goldstein**](https://github.com/coderaiser/goldstein)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to fix issues with
**Madrun** config file.

## Install

```
npm i putout @putout/plugin-goldstein -D
```

## Rules

```json
{
    "rules": {
        "goldstein/convert-t-compile-to-compile": "on"
    }
}
```

## convert-t-compile-to-compile

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a10dd187dc3c6be8df110a8481b9d9bc/3abfc0879aad5ccff5c8e4851cb3ad06270c986e).

### ❌ Example of incorrect code

```js
test('goldstein: keyword: import', async ({compile}) => {
    await compile('import');
    t.end();
});
```

### ✅ Example of correct code

```js
test('goldstein: keyword: import', async ({compile}) => {
    await compile('import');
    t.end();
});
```

## convert-t-compile-to-compile

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5272c99178bbf9e75f30177e7e9c15a9/9a3e81a9e9dd756915cbecff32acc5c50cddeca3).

### ❌ Example of incorrect code

```js
test('goldstein: keyword: try: not-supported', (t) => {
    t.raise('not-supported', `After 'try' only '{', 'await' and 'function call' can come (1:8)`);
});
```

### ✅ Example of correct code

```js
test('goldstein: keyword: try: not-supported', async ({raise}) => {
    await raise('not-supported', `After 'try' only '{', 'await' and 'function call' can come (1:8)`);
});

```

## License

MIT
