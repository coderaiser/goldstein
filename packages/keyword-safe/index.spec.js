import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: safe', (t) => {
    t.compile('safe');
    t.end();
});
