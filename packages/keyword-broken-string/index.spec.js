import {createTest} from '../test/index.js';
import keywordBrokenString from './index.js';

const test = createTest(import.meta.url, keywordBrokenString);

test('goldstein: broken-string', (t) => {
    t.compile('broken-string');
    t.end();
});

test('goldstein: broken-string: no-semi', (t) => {
    t.compile('no-semi');
    t.end();
});
