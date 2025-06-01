import {types} from 'putout';
import {tokTypes as tt} from '../operator/index.js';

const {identifier} = types;

export default function keywordCurry(Parser) {
    return class extends Parser {
        parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
            const isTRA = this.eat(tt.prefix);
            
            if (isTRA)
                return this.parseCurry(base, startPos, startLoc);
            
            return super.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
        }
        
        parseCurry(base, startPos, startLoc) {
            const node = this.startNodeAt(startPos, startLoc);
            const isParenL = this.eat(tt.parenL);
            
            if (!isParenL)
                this.raise(this.start, `After '~' should always go '(' when you use curry`);
            
            node.callee = identifier('currify');
            node.arguments = [base, this.parseExpression()];
            
            this.expect(tt.parenR);
            
            return this.finishNode(node, 'CallExpression');
        }
    };
}
