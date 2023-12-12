const {assign} = Object;

export default function keywordThrow(Parser) {
    const {keywordTypes} = Parser.acorn;
    
    return class extends Parser {
        parseExprAtom(refDestructuringErrors, forInit) {
            if (this.type === keywordTypes.throw)
                return this.parseThrowExpression();
            
            return super.parseExprAtom(refDestructuringErrors, forInit);
        }
        
        parseThrowExpression() {
            this.next();
            
            const node = super.startNode();
            const expression = this.parseExpression();
            
            assign(node, {
                body: [{
                    type: 'ThrowStatement',
                    argument: expression,
                }],
            });
            
            return super.finishNode(node, 'BlockStatement');
        }
    };
}
