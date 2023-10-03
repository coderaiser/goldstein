import estreeToBabel from 'estree-to-babel';
import {transform} from 'putout';
import {print} from '../printer/index.js';
import * as applyTry from './apply-try/index.js';
import {
    fixEmpty,
    parse,
} from '../goldstein/index.js';

export const convert = (source) => {
    const ast = estreeToBabel(parse(source));
    
    transform(ast, source, {
        plugins: [
            ['apply-try', applyTry],
        ],
    });
    
    return fixEmpty(print(ast));
};
