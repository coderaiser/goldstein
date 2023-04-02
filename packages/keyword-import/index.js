import {tokTypes} from '../operator/index.js';

const empty = [];

export default function keywordImport(Parser) {
    return class extends Parser {
        parseImport(node) {
            this.next();
            
            // import '...'
            if (this.type === tokTypes.string) {
                node.specifiers = empty;
                node.source = this.parseExprAtom();
            } else {
                node.specifiers = this.parseImportSpecifiers();
                this.expectContextual('from');
                
                node.source = this.type === tokTypes.string ? this.parseLiteral(this.value) : this.unexpected();
            }
            
            const {raw, value} = node.source;
            
            if (value.endsWith('.gs')) {
                node.source.raw = raw.replace('.gs', '.js');
                node.source.value = value.replace(/\.gs$/, '.js');
            }
            
            this.semicolon();
            
            return this.finishNode(node, 'ImportDeclaration');
        }
    };
}

