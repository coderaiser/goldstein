import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: add-array', (t) => {
    t.compile('add-array');
    t.end();
});
