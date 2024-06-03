import {tokTypes as tt} from '../operator/index.js';
import {parseMaybeAssign} from '../internal-parse-maybe-assign/index.js';

export default function fn(Parser) {
    return class extends Parser {
        parseMaybeAssign(forInit, refDestructuringErrors, afterLeftParse) {
            return parseMaybeAssign.call(this, forInit, refDestructuringErrors, afterLeftParse);
        }
        
        goldsteinParseFrom(node) {
            if (this.type === tt.semi)
                return node;
            
            const arg = this.parseExprAtom();
            
            return {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'require',
                },
                arguments: [arg],
            };
        }
    };
}
