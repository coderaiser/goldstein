import {addKeyword, TokenType} from '../operator/index.js';

const KEYWORD_FN = 'fn';

export default function keywordFn(Parser) {
    const {keywordTypes} = Parser.acorn;
    
    keywordTypes.fn = new TokenType(KEYWORD_FN, {
        keyword: KEYWORD_FN,
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword(KEYWORD_FN, this.keywords);
            
            return super.parse();
        }
        
        parseStatement(context, topLevel, exports) {
            if (this.type === keywordTypes.fn)
                this.type = keywordTypes.function;
            
            return super.parseStatement(context, topLevel, exports);
        }
        
        shouldParseExportStatement() {
            if (this.type === keywordTypes.fn)
                return true;
            
            return super.shouldParseExportStatement();
        }
        
        checkUnreserved(ref) {
            const {name} = ref;
            
            if (name === KEYWORD_FN)
                return;
            
            return super.checkUnreserved(ref);
        }
    };
}
