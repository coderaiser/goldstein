import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: if', (t) => {
    t.compile('if');
    t.end();
});

test('goldstein: keyword: if: let', (t) => {
    t.compile('if-let');
    t.end();
});

test('goldstein: keyword: if: no brace', (t) => {
    t.raise('no-brace', `Use braces ('{', '}') when omit parens ('(', ')') (2:4)`);
    t.end();
});

test('goldstein: keyword: if: diff-parens', (t) => {
    t.raise('diff-parens', `Use both parens ('(', ')') or none (2:4)`);
    t.end();
});
