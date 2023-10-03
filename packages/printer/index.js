import {print as printJS} from '@putout/printer';
import {fixEmpty} from '../goldstein/index.js';
import {AwaitExpression} from './visitors/await-expression.js';
import {CallExpression} from './visitors/call-expression.js';
import {TryStatement} from './visitors/try-statement.js';
import {IfStatement} from './visitors/if-statement.js';

export const print = (ast) => {
    const code = printJS(ast, {
        visitors: {
            CallExpression,
            TryStatement,
            AwaitExpression,
            IfStatement,
        },
    });
    
    return fixEmpty(code);
};
