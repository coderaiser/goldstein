import putout, {
    print,
} from 'putout';
import {extendParser} from '../parser/index.js';
import keywordFn from '../keyword-fn/index.js';
import keywordGuard from '../keyword-guard/index.js';
import keywordTry from '../keyword-try/index.js';
import keywordShould from '../keyword-should/index.js';
import keywordThrow from '../keyword-throw/index.js';
import stringInterpolation from '../string-interpolation/index.js';
import keywordCurry from '../keyword-curry/index.js';
import keywordFreeze from '../keyword-freeze/index.js';

export const compile = (source) => {
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
    
    const ast = parse(source);
    
    const jsCode = print(ast);
    const {code} = putout(jsCode, {
        plugins: [
            'try-catch',
            'declare-undefined-variables',
        ],
    });
    
    return code;
};
