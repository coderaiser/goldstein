import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: fn', (t) => {
    t.compile('fn');
    t.end();
});

test('goldstein: keyword: fn: export', (t) => {
    t.compile('export');
    t.end();
});

test('goldstein: keyword: fn: other-export', (t) => {
    t.compile('other-export');
    t.end();
});
