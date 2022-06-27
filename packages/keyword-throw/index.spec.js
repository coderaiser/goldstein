import {createTest} from '../test/index.js';
import keywordThrow from './index.js';

const test = createTest(import.meta.url, keywordThrow);

test('goldstein: keyword: throw', (t) => {
    t.compile('throw');
    t.end();
});

test('goldstein: keyword: throw-statement', (t) => {
    t.compile('throw-statement');
    t.end();
});
