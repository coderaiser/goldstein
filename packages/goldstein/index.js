import {transform} from 'putout';

import {print} from '@putout/printer';
import {extendParser} from '../parser/index.js';
import keywordFn from '../keyword-fn/index.js';
import keywordGuard from '../keyword-guard/index.js';
import keywordTry from '../keyword-try/index.js';
import keywordShould from '../keyword-should/index.js';
import keywordThrow from '../keyword-throw/index.js';
import stringInterpolation from '../string-interpolation/index.js';
import keywordCurry from '../keyword-curry/index.js';
import keywordFreeze from '../keyword-freeze/index.js';
import keywordIf from '../keyword-if/index.js';
import keywordImport from '../keyword-import/index.js';

import estreeToBabel from 'estree-to-babel';

const defaultKeywords = {
    keywordFn,
    keywordGuard,
    keywordTry,
    keywordShould,
    keywordThrow,
    keywordCurry,
    keywordFreeze,
    keywordIf,
    keywordImport,
    stringInterpolation,
};

export const keywords = defaultKeywords;

export const parse = (source, keywords = defaultKeywords) => {
    const {parse} = extendParser(Object.values(keywords));
    
    return estreeToBabel(parse(source));
};

export const compile = (source, options = {}) => {
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            ...options.rules,
        },
        plugins: [
            'try-catch',
            'declare',
            'logical-expressions',
        ],
    });
    
    const {keywords} = options;
    
    return fixEmpty(print(ast, {keywords}));
};

const fixEmpty = (source) => {
    return source.replace(';;', ';');
};
