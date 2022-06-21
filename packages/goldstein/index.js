import {print} from 'putout';
import keywordFn from '../keyword-fn/index.js';
import keywordGuard from '../keyword-guard/index.js';
import {extendParser} from '../parser/index.js';

export const compile = (source) => {
    const {parse} = extendParser([
        keywordFn,
        keywordGuard,
    ]);
    
    const ast = parse(source);
    
    return print(ast);
};
