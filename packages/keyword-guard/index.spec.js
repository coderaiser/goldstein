import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: guard', (t) => {
    debugger;
    
    t.compile('guard');
    t.end();
});

test('goldstein: keyword: guard: no-parens', (t) => {
    t.compile('no-parens');
    t.end();
});

test('goldstein: keyword: guard: diff-parens', (t) => {
    t.raise('diff-parens', `Use both parens ('(', ')') or none (2:28)`);
    t.end();
});
