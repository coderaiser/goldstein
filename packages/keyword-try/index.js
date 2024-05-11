import {types} from 'putout';
import {setGoldsteinTry} from '../types/try.js';
import {
    BIND_LEXICAL,
    BIND_SIMPLE_CATCH,
    SCOPE_SIMPLE_CATCH,
    tokTypes as tt,
} from '../operator/index.js';

const {
    isCallExpression,
    isAwaitExpression,
} = types;

export default function keywordTry(Parser) {
    const {keywordTypes} = Parser.acorn;
    
    return class extends Parser {
        parseExprAtom(refDestructuringErrors, forInit) {
            if (this.type === keywordTypes.try)
                return this.parseTryStatement();
            
            return super.parseExprAtom(refDestructuringErrors, forInit);
        }
        
        parseTryStatement() {
            this.next();
            
            const node = super.startNode();
            
            if (this.type === tt.braceL)
                return this.parseUglyTry(node);
            
            const expression = this.parseExpression();
            
            if (isCallExpression(expression))
                node.expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'tryCatch',
                    },
                    arguments: [
                        expression.callee,
                        ...expression.arguments,
                    ],
                };
            else if (isAwaitExpression(expression))
                node.expression = {
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
                };
            else
                this.raise(this.start, `After 'try' only '{', 'await' and 'function call' can come`);
            
            setGoldsteinTry(node.expression);
            
            return super.finishNode(node, 'ExpressionStatement');
        }
        
        parseUglyTry(node) {
            node.block = this.parseBlock();
            node.handler = null;
            
            if (this.type === tt._catch) {
                const clause = this.startNode();
                this.next();
                
                if (this.eat(tt.parenL)) {
                    clause.param = this.parseBindingAtom();
                    const simple = clause.param.type === 'Identifier';
                    
                    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
                    this.checkLValPattern(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
                    this.expect(tt.parenR);
                } else {
                    clause.param = null;
                    this.enterScope(0);
                }
                
                clause.body = this.parseBlock(false);
                this.exitScope();
                node.handler = this.finishNode(clause, 'CatchClause');
            }
            
            node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
            
            if (!node.handler && !node.finalizer)
                this.raise(node.start, 'Missing catch or finally clause');
            
            setGoldsteinTry(node);
            
            return this.finishNode(node, 'TryStatement');
        }
    };
}
