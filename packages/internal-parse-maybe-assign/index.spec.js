import ts from 'acorn-typescript';
import {createTest} from '../test/index.js';
import internalParseMaybeAssign from './index.js';

const test = createTest(import.meta.url, ts(), internalParseMaybeAssign);

test('goldstein: keyword: assign-from: raise: add-array', (t) => {
    t.raise('add-array', `☝️Looks like 'keyword-add-array' is missing.`);
    t.end();
});

test('goldstein: keyword: assign-from: raise: assign-from', (t) => {
    t.raise('assign-from', `☝️Looks like 'keyword-assign-from' is missing.`);
    t.end();
});
