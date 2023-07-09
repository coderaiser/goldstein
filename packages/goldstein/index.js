import {transform} from 'putout';
import {print} from '@putout/printer';
import {parse} from './parser.js';
import estreeToBabel from 'estree-to-babel';

export * from './parser.js';
export const compile = (source, options = {}) => {
    const ast = estreeToBabel(parse(source, options));
    
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
    
    return fixEmpty(print(ast));
};

export const fixEmpty = (source) => {
    return source.replace(/;(\s+)?;/g, ';');
};

