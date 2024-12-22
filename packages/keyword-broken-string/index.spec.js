import {createTest} from '../test/index.js';
import keywordBrokenString from './index.js';

const test = createTest(import.meta.url, keywordBrokenString);

test('goldstein: broken-string', (t) => {
    t.compile('broken-string');
    t.end();
});

test('goldstein: broken-string: no-semi', (t) => {
    t.compile('no-semi');
    t.end();
});

test('goldstein: broken-string: infinite', (t) => {
    t.compile('infinite');
    t.end();
});

test('goldstein: punctuation: mobile-quote', (t) => {
    t.compile('mobile-quote');
    t.end();
});

test('goldstein: punctuation: mobile-quote-open', (t) => {
    t.compile('mobile-quote-open');
    t.end();
});

test('goldstein: punctuation: mobile-quote-close', (t) => {
    t.compile('mobile-quote-close');
    t.end();
});
