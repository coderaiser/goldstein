import ts from 'acorn-typescript';
import {createTest} from '../test/index.js';
import keywordFn from './index.js';
import internalParseMaybeAssign from '../internal-parse-maybe-assign/index.js';

const test = createTest(
    import.meta.url,
    ts(),
    internalParseMaybeAssign,
    keywordFn,
);

test('goldstein: keyword: assign-from', (t) => {
    t.compile('assign-from');
    t.end();
});

test('goldstein: internal: parse-maybe-assign: const: no compile', (t) => {
    t.noCompile('const');
    t.end();
});

test('goldstein: internal: parse-maybe-assign: raise: add-array', (t) => {
    t.raise('add-array', `☝️Looks like 'keyword-add-array' is missing.`);
    t.end();
});
