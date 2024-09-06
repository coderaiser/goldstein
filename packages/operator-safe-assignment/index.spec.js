import {createTest} from '../test/index.js';
import operatorSafeAssignment from './index.js';
import keywordMissingInitializer from '../keyword-missing-initializer/index.js';

const test = createTest(import.meta.url, ...[
    operatorSafeAssignment,
    keywordMissingInitializer,
]);

test('goldstein: operator: safe-assignment', (t) => {
    t.compile('safe-assignment');
    t.end();
});

test('goldstein: operator: safe-assignment: not-supported', (t) => {
    t.raise('not-supported', `After '?=' only 'await' and 'function call' can come (1:12)`);
    t.end();
});
