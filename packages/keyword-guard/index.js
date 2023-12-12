import {
    addKeyword,
    TokenType,
    tokTypes,
} from '../operator/index.js';

export default function newSpeak(Parser) {
    const {keywordTypes} = Parser.acorn;
    
    keywordTypes.guard = new TokenType('guard', {
        keyword: 'guard',
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword('guard', this.keywords);
            return super.parse();
        }
        
        parseStatement(context, topLevel, exports) {
            if (this.type === keywordTypes.guard)
                return this.parseGuard();
            
            return super.parseStatement(context, topLevel, exports);
        }
        
        parseGuard() {
            super.next();
            
            const {
                parenL,
                parenR,
                _else,
            } = tokTypes;
            
            const node = super.startNode();
            const isParenL = super.eat(parenL);
            
            node.test = {
                type: 'UnaryExpression',
                operator: '!',
                prefix: true,
                argument: super.parseExpression(),
            };
            
            const isParenR = super.eat(parenR);
            
            if (isParenL !== isParenR)
                this.raise(this.start, `Use both parens ('(', ')') or none`);
            
            super.expect(_else);
            
            node.consequent = this.parseStatement();
            node.alternate = null;
            
            return super.finishNode(node, 'IfStatement');
        }
    };
}
