import {createTest} from '../test/index.js';
import keywordImport from './index.js';

const test = createTest(import.meta.url, keywordImport);

test('goldstein: keyword: import', (t) => {
    t.compile('import');
    t.end();
});
