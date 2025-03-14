import {tokTypes as tt} from '../operator/index.js';
import {setGoldsteinIf} from '../types/if.js';

export default function fn(Parser) {
    return class extends Parser {
        parseIfStatement() {
            this.next();
            const isParenL = this.eat(tt.parenL);
            
            if (this.isContextual('let'))
                return createIfLet.call(this, {
                    isParenL,
                });
            
            const test = this.parseExpression();
            
            return createIf.call(this, {
                test,
                isParenL,
            });
        }
    };
}

function check({isParenL, isParenR}) {
    if (!isParenL && !isParenR && this.type !== tt.braceL)
        this.raise(this.start, `Use braces ('{', '}') when omit parens ('(', ')')`);
    
    if (isParenL !== isParenR)
        this.raise(this.start, `Use both parens ('(', ')') or none`);
}

function createIfLet({isParenL}) {
    this.next();
    this.eat(tt.assign);
    
    const assignmentExpression = this.parseExpression();
    const isParenR = this.eat(tt.parenR);
    
    check.call(this, {
        isParenL,
        isParenR,
    });
    
    const ifNode = createIf.call(this, {
        test: assignmentExpression.left,
        isParenL,
    });
    
    const node = {
        loc: {},
        range: [],
        type: 'BlockStatement',
        body: [{
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [{
                type: 'VariableDeclarator',
                id: assignmentExpression.left,
                init: assignmentExpression.right,
            }],
        },
        ifNode],
    };
    
    return this.finishNode(node, 'BlockStatement');
}

function createIf({test, isParenL}) {
    const node = {
        test,
    };
    
    const isParenR = this.eat(tt.parenR);
    
    check.call(this, {
        isParenL,
        isParenR,
    });
    
    node.consequent = this.parseStatement('if');
    node.alternate = this.eat(tt._else) ? this.parseStatement('if') : null;
    node.range = [];
    node.type = 'IfStatement';
    
    setGoldsteinIf(node);
    
    return this.finishNode(node, 'IfStatement');
}
