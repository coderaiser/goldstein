import {createTest} from '../test/index.js';
import keywordUselessComma from './index.js';

const test = createTest(import.meta.url, keywordUselessComma);

test('goldstein: keyword: useless-comma', (t) => {
    t.compile('useless-comma');
    t.end();
});
