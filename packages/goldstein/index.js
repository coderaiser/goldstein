import {transform} from 'putout';
import {print} from '@putout/printer';
import tryCatchPlugin from '@putout/plugin-try-catch';
import declarePlugin from '@putout/plugin-declare';
import logicalExpressionsPlugin from '@putout/plugin-logical-expressions';
import {parse} from './parser.js';

export {convert} from '../convert/index.js';
export {print} from '../printer/index.js';
export * from './parser.js';
import * as removeUnnamedObjectProperty from '../keyword-useless-comma/remove-unnamed-object-property/index.js';

export const compile = (source, options = {}) => {
    const ast = parse(source, options);
    
    transform(ast, source, {
        rules: {
            ...options.rules,
        },
        plugins: [
            ['try-catch', tryCatchPlugin],
            ['declare', declarePlugin],
            ['logical-expressions', logicalExpressionsPlugin],
            ['remove-unnamed-identifiers', removeUnnamedObjectProperty],
        ],
    });
    
    return fixEmpty(print(ast));
};

export const fixEmpty = (source) => {
    return source.replace(/;(\s+)?;/g, ';');
};
