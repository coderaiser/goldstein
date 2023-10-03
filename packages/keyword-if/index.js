import {tokTypes as tt} from '../operator/index.js';
import {setGoldsteinIf} from '../types/if.js';

export default function fn(Parser) {
    return class extends Parser {
        parseIfStatement(node) {
            this.next();
            
            const isParenL = this.eat(tt.parenL);
            
            node.test = this.parseExpression();
            const isParenR = this.eat(tt.parenR);
            
            if (!isParenL && !isParenR && this.type !== tt.braceL)
                this.raise(this.start, `Use braces ('{', '}') when omit parens ('(', ')')`);
            
            if (isParenL !== isParenR)
                this.raise(this.start, `Use both parens ('(', ')') or none`);
            
            node.consequent = this.parseStatement('if');
            node.alternate = this.eat(tt._else) ? this.parseStatement('if') : null;
            
            setGoldsteinIf(node);
            
            return this.finishNode(node, 'IfStatement');
        }
    };
}

