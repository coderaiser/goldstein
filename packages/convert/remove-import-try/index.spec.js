import {createTest} from '@putout/test';
import * as removeImportTry from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['remove-import-try', removeImportTry],
    ],
});

test('plugin-goldstein: remove-import-try: report', (t) => {
    t.report('try', `Remove import of 'tryCatch/tryToCatch'`);
    t.end();
});

test('plugin-goldstein: remove-import-try: transform', (t) => {
    t.transform('try');
    t.end();
});
