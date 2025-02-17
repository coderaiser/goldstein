import {types} from 'putout';
import {setGoldsteinTry} from '../types/try.js';
import {MissingInitializer} from '../keyword-missing-initializer/index.js';
import {tokTypes as tt} from '../operator/index.js';

const {assign} = Object;

const {
    isCallExpression,
    isAwaitExpression,
} = types;

export default function operatorSafeAssignment(Parser) {
    return class extends Parser {
        parseVar(node, isFor, kind, allowMissingInitializer) {
            node.declarations = [];
            node.kind = kind;
            for (;;) {
                const decl = this.startNode();
                this.parseVarId(decl, kind);
                
                if (this.eat(tt.question) && this.eat(tt.eq))
                    decl.init = this.parseSafeAssignment(); /* c8 ignore start */
                else if (this.eat(tt.eq))
                    decl.init = this.parseMaybeAssign(isFor);
                else if (!allowMissingInitializer && kind === 'const' && this.type !== tt._in && !(this.options.ecmaVersion >= 6 && this.isContextual('of')))
                    decl.init = MissingInitializer.missInitializer.call(this, isFor);
                else if (!allowMissingInitializer && decl.id.type !== 'Identifier' && !(isFor && (this.type === tt._in || this.isContextual('of'))))
                    this.raise(this.lastTokEnd, 'Complex binding patterns require an initialization value');
                else
                    decl.init = null;
                
                /* c8 ignore end */
                node.declarations.push(this.finishNode(decl, 'VariableDeclarator'));
                
                if (!this.eat(tt.comma))
                    break;
            }
            
            return node;
        }
        
        parseSafeAssignment() {
            const node = super.startNode();
            const expression = this.parseExpression();
            
            if (isCallExpression(expression))
                assign(node, {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'tryCatch',
                    },
                    arguments: [
                        expression.callee,
                        ...expression.arguments,
                    ],
                });
            else if (isAwaitExpression(expression))
                assign(node, {
                    type: 'AwaitExpression',
                    argument: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'tryToCatch',
                        },
                        arguments: [
                            expression.argument.callee,
                            ...expression.argument.arguments,
                        ],
                    },
                });
            else
                this.raise(this.start, `After '?=' only 'await' and 'function call' can come`);
            
            setGoldsteinTry(node);
            return super.finishNode(node, node.type);
        }
    };
}
