import putout, {
    print,
} from 'putout';
import {extendParser} from '../parser/index.js';
import keywordFn from '../keyword-fn/index.js';
import keywordGuard from '../keyword-guard/index.js';
import keywordSafe from '../keyword-safe/index.js';

export const compile = (source) => {
    const {parse} = extendParser([
        keywordFn,
        keywordGuard,
        keywordSafe,
    ]);
    
    const ast = parse(source);
    
    const jsCode = print(ast);
    const {code} = putout(jsCode, {
        plugins: [
            'try-catch',
        ],
    });
    
    return code;
};
