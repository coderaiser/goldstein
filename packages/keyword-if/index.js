import {tokTypes as tt} from '../operator/index.js';

console.log('zzz');

export default function fn(Parser) {
    return class extends Parser {
        parseIfStatement(node) {
            debugger;
            this.next();
            console.log('aaaa');
            
            const isParenL = this.eat(tt.parenL);
            
            node.test = this.parseExpression();
            const isParenR = this.eat(tt.parenR);
            
            if (!isParenL && !isParenR && this.type !== tt.braceL)
                this.raise(this.start, `Use braces ('{', '}') when omit parens ('(', ')')`);
            
            if (isParenL !== isParenR)
                this.raise(this.start, `Use both parens ('(', ')') or none`);
            
            console.log('bbb');
            node.consequent = this.parseStatement('if');
            console.log('cccc');
            node.alternate = this.eat(tt._else) ? this.parseStatement('if') : null;
            console.log('dddd');
            
            return this.finishNode(node, 'IfStatement');
        }
    };
}

