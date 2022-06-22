import {types} from 'putout';
import {
    addKeyword,
    TokenType,
} from '../operator/index.js';

const {
    isCallExpression,
    isAwaitExpression,
} = types;

// why not 'try'?
// because acorn internals should be copied, and added tests.
// there is no such thing as this.previous(), only this.next() 🤷‍

export default function newSpeak(Parser) {
    const {keywordTypes} = Parser.acorn;
    keywordTypes.safe = new TokenType('safe', {
        keyword: 'safe',
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword('safe', this.keywords);
            
            return super.parse();
        }
        parseStatement(context, topLevel, exports) {
            if (this.type === keywordTypes.safe)
                return this.parseSafe();
            
            return super.parseStatement(context, topLevel, exports);
        }
        parseExprAtom(refDestructuringErrors, forInit) {
            if (this.type === keywordTypes.safe)
                return this.parseSafe();
            
            return super.parseExprAtom(refDestructuringErrors, forInit);
        }
        
        parseSafe() {
            this.next();
            
            const node = super.startNode();
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
                this.raise(this.start, `After 'safe' only 'await' and 'function call' can come`);
            
            return super.finishNode(node, 'ExpressionStatement');
        }
    };
}

