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

## License

MIT
