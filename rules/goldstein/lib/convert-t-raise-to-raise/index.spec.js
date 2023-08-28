import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-t-raise-to-raise', plugin],
    ],
});

test('rules: convert-t-raise-to-raise: report', (t) => {
    t.report('convert-t-raise-to-raise', `Use 'raise()' instead of 't.raise()'`);
});

test('rules: convert-t-raise-to-raise: transform', (t) => {
    t.transform('convert-t-raise-to-raise');
});
