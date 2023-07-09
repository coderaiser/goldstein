import {createTest} from '../test/index.js';
import keywordCurry from './index.js';

const test = createTest(import.meta.url, keywordCurry);

test('goldstein: curry', (t) => {
    t.compile('curry');
    t.end();
});
