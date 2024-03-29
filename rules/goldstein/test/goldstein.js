import {createTest} from '@putout/test';
import * as goldstein from '../lib/index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['goldstein', goldstein],
    ],
});

test('plugin-goldstein: transform: convert-t-compile-to-compile', (t) => {
    t.transform('convert-t-compile-to-compile');
    t.end();
});

test('plugin-goldstein: transform: convert-t-raise-to-raise', (t) => {
    t.transform('convert-t-raise-to-raise');
    t.end();
});
