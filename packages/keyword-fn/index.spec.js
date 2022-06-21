import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: fn', (t) => {
    t.compile('fn');
    t.end();
});
