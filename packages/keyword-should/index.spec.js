import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: should', (t) => {
    t.compile('should');
    t.end();
});

test('goldstein: keyword: should (with await)', (t) => {
    t.compile('await-should');
    t.end();
});

test('goldstein: keyword: should (brackets)', (t) => {
    t.raise('not-supported', `After 'should' only 'await' and 'function call' can come, brackets are not supported (1:7)`);
    t.end();
});
