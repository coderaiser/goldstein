import {transform} from 'putout';
import {print} from '@putout/printer';
import {parse} from './parser.js';
import estreeToBabel from 'estree-to-babel';

export * from './parser.js';

export const compile = (source, options = {}) => {
    const ast = estreeToBabel(parse(source));
    
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

