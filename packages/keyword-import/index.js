import {tokTypes} from '../operator/index.js';

const empty = [];

export default function keywordImport(Parser) {
    return class extends Parser {
        parseImport(node) {
            this.next();
            
            // import '...'
            /* c8 ignore start */
            if (this.type === tokTypes.string) {
                node.specifiers = empty;
                node.source = this.parseExprAtom(); /* c8 ignore end */
            } else {
                node.specifiers = this.parseImportSpecifiers();
                this.expectContextual('from');
                
                if (this.type === tokTypes.string) {
                    node.source = this.parseLiteral(this.value);
                } else if (this.type === tokTypes.name) {
                    const {value} = this;
                    
                    node.source = this.parseLiteral(this.value);
                    node.source.raw = `'${value}'`;
                } else {
                    this.unexpected();
                }
            }
            
            const {raw, value} = node.source;
            
            if (value.endsWith('.gs')) {
                node.source.raw = raw.replace('.gs', '.js');
                node.source.value = value.replace(/\.gs$/, '.js');
            }
            
            super.eat(tokTypes.parenR);
            this.semicolon();
            
            return this.finishNode(node, 'ImportDeclaration');
        }
    };
}
