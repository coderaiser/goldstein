import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: try', (t) => {
    t.compile('try');
    t.end();
});

test('goldstein: keyword: try: await', (t) => {
    t.compile('await');
    t.end();
});

test('goldstein: keyword: try: var', (t) => {
    t.compile('var');
    t.end();
});

test('goldstein: keyword: try: try-catch', (t) => {
    t.compile('try-catch');
    t.end();
});

test('goldstein: keyword: try: fn', (t) => {
    t.compile('fn');
    t.end();
});

test('goldstein: keyword: try: not-supported', (t) => {
    t.raise('not-supported', `After 'try' only '{', 'await' and 'function call' can come (1:8)`);
    t.end();
});
