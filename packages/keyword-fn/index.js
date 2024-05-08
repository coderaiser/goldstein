import {addKeyword, TokenType} from '../operator/index.js';
import {tokTypes as tt} from 'acorn';

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
            const isParen = this.eat(tt.parenL);
            
            if (!isParen && this.type === Parser.acorn.keywordTypes.fn)
                this.type = Parser.acorn.keywordTypes.function;
            
            return super.parseStatement(context, topLevel, exports);
        }
        
        shouldParseExportStatement() {
            if (this.type === Parser.acorn.keywordTypes.fn)
                return true;
            
            return super.shouldParseExportStatement();
        }
        
        checkUnreserved(ref) {
            const {name} = ref;
            
            if (name === 'fn')
                return;
            
            return super.checkUnreserved(ref);
        }
    };
}

