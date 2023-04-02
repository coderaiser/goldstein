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

import estreeToBabel from 'estree-to-babel';

export const parse = (source) => {
    const {parse} = extendParser([
        keywordFn,
        keywordGuard,
        keywordTry,
        keywordShould,
        keywordThrow,
        keywordCurry,
        keywordFreeze,
        stringInterpolation,
    ]);
    
    return estreeToBabel(parse(source));
};

export const compile = (source) => {
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'try-catch',
            'declare',
        ],
    });
    
    return fixEmpty(print(ast));
};

const fixEmpty = (source) => {
    return source.replace(';;', ';');
};
