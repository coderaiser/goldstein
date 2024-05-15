import {createTest} from '../test/index.js';
import keywordCurry from './index.js';

const test = createTest(import.meta.url, keywordCurry);

test('goldstein: curry', (t) => {
    t.compile('curry');
    t.end();
});

test('goldstein: curry: raise', (t) => {
    t.raise('raise', `After '~' should always go '(' when you use curry (1:16)`);
    t.end();
});
