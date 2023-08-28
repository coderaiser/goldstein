import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-t-compile-to-compile', plugin],
    ],
});

test('rules: convert-t-compile-to-compile: report', (t) => {
    t.report('convert-t-compile-to-compile', `Use 'compile()' instead of 't.compile()'`);
});

test('rules: convert-t-compile-to-compile: transform', (t) => {
    t.transform('convert-t-compile-to-compile');
});

test('rules: convert-t-compile-to-compile: no report: done', (t) => {
    t.noReport('done');
});
