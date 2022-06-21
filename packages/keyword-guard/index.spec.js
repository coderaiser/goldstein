import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: keyword: guard', (t) => {
    t.compile('guard');
    t.end();
});
