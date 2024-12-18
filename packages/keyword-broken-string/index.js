import {tokTypes as tt} from '../operator/index.js';

export default function keywordBrokenString(Parser) {
    return class extends Parser {
        parseVarStatement(node, kind, allowMissingInitializer) {
            this.next();
            this.parseVar(node, false, kind, allowMissingInitializer);
            this.eat(tt.semi);
            
            return this.finishNode(node, 'VariableDeclaration');
        }
        
        readString(quote) {
            let out = '';
            let chunkStart = ++this.pos;
            
            for (;;) {
                const ch = this.input.charCodeAt(this.pos);
                
                if (!ch)
                    break;
                
                if (ch === quote)
                    break;
                
                /* c8 ignore start */
                if (ch === 92) {
                    // '\'
                    out += this.input.slice(chunkStart, this.pos);
                    out += this.readEscapedChar(false);
                    chunkStart = this.pos;
                } else if (ch === 0x2028 || ch === 0x2029) {
                    if (this.options.ecmaVersion < 10)
                        this.raise(this.start, 'Unterminated string constant');
                    
                    ++this.pos;
                    
                    if (this.options.locations) {
                        this.curLine++;
                        this.lineStart = this.pos;
                    }
                    /* c8 ignore end */
                } else {
                    if (isNewLine(ch)) {
                        if (this.input[this.pos - 1] === ';')
                            --this.pos;
                        
                        break;
                    }
                    
                    ++this.pos;
                }
            }
            
            out += this.input.slice(chunkStart, this.pos++);
            
            return this.finishToken(tt.string, out);
        }
    };
}

function isNewLine(code) {
    return code === 10
        || code === 13
        || code === 0x2028
        || code === 0x2029;
}
