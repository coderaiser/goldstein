import {types} from 'putout';
import {
    addKeyword,
    TokenType,
    tokTypes as tt,
} from '../operator/index.js';

const {
    isCallExpression,
    isAwaitExpression,
} = types;

export default function newSpeak(Parser) {
    const {keywordTypes} = Parser.acorn;
    
    keywordTypes.should = new TokenType('should', {
        keyword: 'should',
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword('should', this.keywords);
            return super.parse();
        }
        
        parseStatement(context, topLevel, exports) {
            if (this.type === keywordTypes.should)
                return this.parseShould();
            
            return super.parseStatement(context, topLevel, exports);
        }
        
        parseShould() {
            this.next();
            
            const node = super.startNode();
            
            if (this.type === tt.braceL)
                return this.raise(this.start, `After 'should' only 'await' and 'function call' can come, brackets are not supported`);
            
            const expression = this.parseExpression();
            
            if (isCallExpression(expression))
                node.expression = {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: expression.callee,
                                arguments: expression.arguments.slice(),
                            },
                        }],
                    },
                    handler: {
                        type: 'CatchClause',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                        },
                    },
                };
            else if (isAwaitExpression(expression))
                node.expression = {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression,
                        }],
                    },
                    handler: {
                        type: 'CatchClause',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                        },
                    },
                };
            
            return super.finishNode(node, 'ExpressionStatement');
        }
    };
}
