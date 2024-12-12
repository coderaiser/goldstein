import {createTest} from '../test/index.js';
import keywordExportNoConst from './index.js';

const test = createTest(import.meta.url, keywordExportNoConst);

test('goldstein: keyword: export-no-const', (t) => {
    t.compile('export-no-const');
    t.end();
});
