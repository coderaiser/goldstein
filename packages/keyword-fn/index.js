import {
    addKeyword,
    TokenType,
} from '../operator/index.js';

export default function fn(Parser) {
    Parser.acorn.keywordTypes.fn = new TokenType('fn', {
        keyword: 'fn',
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword('fn', this.keywords);
            
            return super.parse();
        }
        parseStatement(context, topLevel, exports) {
            if (this.type === Parser.acorn.keywordTypes.fn) {
                this.type = Parser.acorn.keywordTypes.function;
            }
            
            return super.parseStatement(context, topLevel, exports);
        }
        shouldParseExportStatement() {
            if (this.type === Parser.acorn.keywordTypes.fn) {
                return true;
            }
            
            return super.shouldParseExportStatement();
        }
    };
}

