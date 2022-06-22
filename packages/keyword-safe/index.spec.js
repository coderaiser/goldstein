import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: safe', (t) => {
    t.compile('safe');
    t.end();
});

test('goldstein: keyword: safe: await', (t) => {
    t.compile('await');
    t.end();
});

test('goldstein: keyword: safe: var', (t) => {
    t.compile('var');
    t.end();
});

test('goldstein: keyword: safe: not-supported', (t) => {
    t.raise('not-supported', `After 'safe' only 'await' and 'function call' can come (1:9)`);
    t.end();
});

