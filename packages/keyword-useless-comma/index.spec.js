import {createTest} from '../test/index.js';
import keywordUselessComma from './index.js';

const test = createTest(import.meta.url, keywordUselessComma);

test('goldstein: keyword: useless-comma', (t) => {
    t.compile('useless-comma');
    t.end();
});

test('goldstein: keyword: useless-comma: not parse "=" as identifier', (t) => {
    t.raise('assign-token', 'Unexpected token (1:6)');
    t.end();
});
