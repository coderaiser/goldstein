import {createTest} from '../test/index.js';
import keywordBrokenString from './index.js';

const test = createTest(import.meta.url, keywordBrokenString);

test('goldstein: missing-initializer', (t) => {
    t.compile('missing-initializer');
    t.end();
});
