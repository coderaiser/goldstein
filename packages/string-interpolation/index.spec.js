import {createTest} from '../test/index.js';
import keywordFn from './index.js';

const test = createTest(import.meta.url, keywordFn);

test('goldstein: string-interpolation: simple', (t) => {
    t.compile('simple');
    t.end();
});

test('goldstein: string-interpolation: number', (t) => {
    t.noCompile('number');
    t.end();
});
