import {tokTypes as tt} from 'acorn';

export default function fn(Parser) {
    return class extends Parser {
        parseObj(isPattern, refDestructuringErrors) {
            const node = this.startNode();
            let first = true;
            const propHash = {};
            
            node.properties = [];
            this.next();
            
            while (!this.eat(tt.braceR)) {
                if (!first) {
                    this.eat(tt.comma);
                    this.eat(tt.semi);
                    
                    if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(tt.braceR))
                        break;
                } else {
                    first = false;
                }
                
                const prop = this.parseProperty(isPattern, refDestructuringErrors);
                
                if (!isPattern)
                    this.checkPropClash(prop, propHash, refDestructuringErrors);
                
                node.properties.push(prop);
            }
            
            /* c8 ignore start */
            return this.finishNode(node, isPattern ? 'ObjectPattern' : 'ObjectExpression'); /* c8 ignore end */
        }
    };
}
