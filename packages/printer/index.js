import {print as printJS} from '@putout/printer';

import {AwaitExpression} from './visitors/await-expression.js';
import {CallExpression} from './visitors/call-expression.js';
import {TryStatement} from './visitors/try-statement.js';
import {fixEmpty} from '../goldstein/index.js';

export const print = (ast) => {
    const code = printJS(ast, {
        visitors: {
            CallExpression,
            TryStatement,
            AwaitExpression,
        },
    });
    
    return fixEmpty(code);
};
