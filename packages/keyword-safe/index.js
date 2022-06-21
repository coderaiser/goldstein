import {
    addKeyword,
    TokenType,
} from '../operator/index.js';

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
        
        parseSafe() {
            this.next();
            
            const node = super.startNode();
            const callExpression = this.parseExpression();
            
            node.expression = {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'tryCatch',
                },
                arguments: [
                    callExpression.callee,
                    ...callExpression.arguments,
                ],
            };
            
            return super.finishNode(node, 'ExpressionStatement');
        }
    };
}

