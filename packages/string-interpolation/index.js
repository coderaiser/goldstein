import template from '@babel/template';

const {assign} = Object;

export default function newSpeak(Parser) {
    return class extends Parser {
        parseLiteral(value) {
            const chars = value.split('');
            
            let literalOpened = false;
            let parenthesis = 0;
            const out = [];
            let isTeplateLiteral = false;
            
            chars.forEach((char, index) => {
                if (char === '(') {
                    // keep count of parenthesis
                    parenthesis++;
                    
                    // check if previous token was "/" (only if literal is not opened yet)
                    const prev = index - 1;
                    
                    if (chars[prev] === '/' && !literalOpened) {
                        // set previous char to "$"
                        out[prev] = '$';
                        // set current char to "{"
                        char = '{';
                        
                        // set literalOpened to true
                        literalOpened = true;
                        // match TemplateLiteral instead of StringLiteral
                        isTeplateLiteral = true;
                    }
                } else if (char === ')') {
                    parenthesis--;
                    
                    if (parenthesis === 0 && literalOpened) {
                        char = '}';
                        
                        // reset literalOpened to false
                        literalOpened = false;
                    }
                }
                
                out.push(char);
            });
            
            if (isTeplateLiteral) {
                const node = this.startNode();
                const ast = template.default.ast('`' + out.join('') + '`');
                const {quasis, expressions} = ast.expression;
                
                assign(node, {
                    quasis,
                    expressions,
                });
                this.next();
                
                return this.finishNode(node, 'TemplateLiteral');
            }
            
            return super.parseLiteral(out.join(''));
        }
    };
}

