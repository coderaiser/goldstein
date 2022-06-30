import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: freeze', (t) => {
    t.compile('freeze');
    t.end();
});

test('goldstein: keyword: freeze (using array)', (t) => {
    t.compile('array-freeze');
    t.end();
});

test('goldstein: keyword: freeze (invalid)', (t) => {
    t.raise('not-supported', `After 'freeze' only objects and arrays can come (1:11)`);
    t.end();
});
