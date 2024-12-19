import {types} from 'putout';
import {tokTypes as tt} from '../operator/index.js';

const {
    VariableDeclaration,
    VariableDeclarator,
} = types;

export default function keywordExportNoConst(Parser) {
    return class extends Parser {
        shouldParseExportStatement() {
            if (!this.type.keyword)
                return true;
            
            return super.shouldParseExportStatement();
        }
        
        parseExport(node, exports) {
            this.next();
            
            /* c8 ignore start */
            // export * from '...'
            if (this.eat(tt.star))
                return this.parseExportAllDeclaration(node, exports);
            
            /* c8 ignore end */
            /* c8 ignore start */
            if (this.eat(tt._default)) {
                // export default ...
                this.checkExport(exports, 'default', this.lastTokStart);
                node.declaration = this.parseExportDefaultDeclaration();
                
                return this.finishNode(node, 'ExportDefaultDeclaration');
            }
            
            /* c8 ignore end */
            // export var|const|let|function|class ...
            if (this.shouldParseExportStatement()) {
                node.declaration = this.parseExportDeclaration(node);
                
                if (node.declaration.type === 'VariableDeclaration')
                    this.checkVariableExport(exports, node.declaration.declarations);
                
                if (node.declaration.type === 'ExpressionStatement')
                    node.declaration = VariableDeclaration('const', [
                        VariableDeclarator(node.declaration.expression.left, node.declaration.expression.right),
                    ]);
                else if (node.declaration.id)
                    this.checkExport(exports, node.declaration.id, node.declaration.id.start);
                
                node.specifiers = [];
                node.source = null;
            } else {
                // export { x, y as z } [from '...']
                node.declaration = null;
                node.specifiers = this.parseExportSpecifiers(exports);
                
                if (this.eatContextual('from')) {
                    if (this.type !== tt.string)
                        this.unexpected();
                    
                    node.source = this.parseExprAtom();
                    
                    if (this.options.ecmaVersion >= 16)
                        node.attributes = this.parseWithClause();
                } else {
                    for (let i = 0, list = node.specifiers; i < list.length; ++i) {
                        // check for keywords used as local names
                        const spec = list[i];
                        
                        this.checkUnreserved(spec.local);
                        // check if export is defined
                        this.checkLocalExport(spec.local);
                        
                        if (spec.local.type === 'Literal')
                            this.raise(spec.local.start, 'A string literal cannot be used as an exported binding without `from`.');
                    }
                    
                    node.source = null;
                }
                
                this.semicolon();
            }
            
            return this.finishNode(node, 'ExportNamedDeclaration');
        }
    };
}
