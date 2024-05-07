import estreeToBabel from 'estree-to-babel';
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
import keywordArrow from '../keyword-arrow/index.js';
import keywordAddArray from '../keyword-add-array/index.js';

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
    keywordArrow,
    keywordAddArray,
    stringInterpolation,
};

export const keywords = defaultKeywords;

export const parse = (source, options = {}, keywords = defaultKeywords) => {
    const {parse} = extendParser(Object.values({
        ...options.keywords,
        ...keywords,
    }));
    
    const ast = parse(source);
    
    if (options.type === 'estree')
        return ast;
    
    return estreeToBabel(ast);
};
