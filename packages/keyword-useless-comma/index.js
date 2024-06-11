import {tokTypes as tt} from 'acorn';

export default function fn(Parser) {
    return class extends Parser {
        parseIdentNode() {
            const node = this.startNode();
            
            /* c8 ignore start */
            if (this.type === tt.name) {
                node.name = this.value;
            } else if (this.type.keyword) {
                node.name = this.type.keyword;
                
                // To fix https://github.com/acornjs/acorn/issues/575
                // `class` and `function` keywords push new context into this.context.
                // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
                // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
                if ((node.name === 'class' || node.name === 'function') && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46))
                    this.context.pop();
                
                this.type = tt.name; /* c8 ignore end */
            } else {
                node.name = this.value;
            }
            
            return node;
        }
    };
}
