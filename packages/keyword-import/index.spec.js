import {createTest} from '../test/index.js';
import keywordImport from './index.js';

const test = createTest(import.meta.url, keywordImport);

test('goldstein: keyword: import', (t) => {
    t.compile('import');
    t.end();
});

test('goldstein: keyword: import: identifier', (t) => {
    t.compile('import-identifier');
    t.end();
});

test('goldstein: keyword: import: wrong-brace', (t) => {
    t.compile('wrong-brace');
    t.end();
});
