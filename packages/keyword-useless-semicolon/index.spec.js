import {createTest} from '../test/index.js';
import keywordUselessComma from './index.js';

const test = createTest(import.meta.url, keywordUselessComma);

test('goldstein: keyword: useless-semicolon', (t) => {
    t.compile('useless-semicolon');
    t.end();
});
