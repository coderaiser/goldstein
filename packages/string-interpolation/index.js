import {template} from 'putout';

const isString = (a) => typeof a === 'string';
const {assign} = Object;

export default function stringInterpolation(Parser) {
    return class extends Parser {
        parseLiteral(value) {
            if (!isString(value))
                return super.parseLiteral(value);
            
            const chars = value.split('');
            
            let literalOpened = false;
            let parenthesis = 0;
            const out = [];
            let isTemplateLiteral = false;
            
            for (let [index, char] of chars.entries()) {
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
                        isTemplateLiteral = true;
                    }
                } else if (char === ')') {
                    parenthesis--;
                    
                    if (!parenthesis && literalOpened) {
                        char = '}';
                        // reset literalOpened to false
                        literalOpened = false;
                    }
                }
                
                out.push(char);
            }
            
            if (isTemplateLiteral) {
                const node = this.startNode();
                this.next();
                
                const {quasis, expressions} = template.ast(`\`${out.join('')}\``);
                
                assign(node, {
                    quasis,
                    expressions,
                });
                
                return this.finishNode(node, 'TemplateLiteral');
            }
            
            return super.parseLiteral(out.join(''));
        }
    };
}
