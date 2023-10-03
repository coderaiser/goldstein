import {transform} from 'putout';
import {print} from '@putout/printer';
import estreeToBabel from 'estree-to-babel';
import tryCatchPlugin from '@putout/plugin-try-catch';
import declarePlugin from '@putout/plugin-declare';
import logicalExpressionsPlugin from '@putout/plugin-logical-expressions';
import {parse} from './parser.js';

export * from './parser.js';
export const compile = (source, options = {}) => {
    const ast = estreeToBabel(parse(source, options));
    
    transform(ast, source, {
        rules: {
            ...options.rules,
        },
        plugins: [
            ['try-catch', tryCatchPlugin],
            ['declare', declarePlugin],
            ['logical-expressions', logicalExpressionsPlugin],
        ],
    });
    
    return fixEmpty(print(ast));
};

export const fixEmpty = (source) => {
    return source.replace(/;(\s+)?;/g, ';');
};
