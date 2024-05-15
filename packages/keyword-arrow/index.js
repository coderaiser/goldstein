import {tokTypes as tt} from 'acorn';

export default function fn(Parser) {
    return class extends Parser {
        parseBlock(createNewLexicalScope, node, exitStrict) {
            if (createNewLexicalScope === void 0)
                createNewLexicalScope = true;
            
            if (node === void 0)
                node = this.startNode();
            
            node.body = [];
            // optionally parse arrow
            this.eat(tt.arrow);
            this.expect(tt.braceL);
            
            if (createNewLexicalScope)
                this.enterScope(0);
            
            while (this.type !== tt.braceR) {
                const stmt = this.parseStatement(null);
                node.body.push(stmt);
            }
            
            /* c8 ignore start */
            if (exitStrict)
                this.strict = false;
            
            /* c8 ignore end */
            this.next();
            
            if (createNewLexicalScope)
                this.exitScope();
            
            return this.finishNode(node, 'BlockStatement');
        }
    };
}
