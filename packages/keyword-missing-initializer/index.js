import {tokTypes as tt} from '../operator/index.js';

export default function keywordMissingInitializer(Parser) {
    return class extends Parser {
        parseVar(node, isFor, kind, allowMissingInitializer) {
            node.declarations = [];
            node.kind = kind;
            for (;;) {
                const decl = this.startNode();
                this.parseVarId(decl, kind);
                
                if (this.eat(tt.eq))
                    decl.init = this.parseMaybeAssign(isFor);
                else if (!allowMissingInitializer && kind === 'const' && !(this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual('of')))
                    decl.init = this.parseMaybeAssign(isFor);
                /* c8 ignore start */
                else if (!allowMissingInitializer && decl.id.type !== 'Identifier' && !(isFor && (this.type === tt._in || this.isContextual('of'))))
                    this.raise(this.lastTokEnd, 'Complex binding patterns require an initialization value');
                else
                    decl.init = null;
                
                /* c8 ignore end */
                node.declarations.push(this.finishNode(decl, 'VariableDeclarator'));
                
                if (!this.eat(tt.comma))
                    break;
            }
            
            return node;
        }
    };
}
