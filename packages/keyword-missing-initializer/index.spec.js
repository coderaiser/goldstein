import {createTest} from '../test/index.js';
import keywordBrokenString from './index.js';
import operatorSafeAssignment from '../operator-safe-assignment/index.js';

const test = createTest(import.meta.url, keywordBrokenString);
const testSafeAssignment = createTest(import.meta.url, ...[keywordBrokenString, operatorSafeAssignment]);

test('goldstein: missing-initializer', (t) => {
    t.compile('missing-initializer');
    t.end();
});

testSafeAssignment('goldstein: missing-initializer: safeAssignment', (t) => {
    t.compile('missing-initializer');
    t.end();
});

test('goldstein: missing-initializer: no safeAssignment', (t) => {
    t.raise('no-safe-assignment', `Enable 'operator-safe-assignment' to have ability to use '?=' (1:26)`);
    t.end();
});
