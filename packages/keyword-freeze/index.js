import {types} from 'putout';
import {
    addKeyword,
    TokenType,
    tokTypes as tt,
} from '../operator/index.js';

const {
    isObjectExpression,
    isArrayExpression
} = types;

export default function newSpeak(Parser) {
    const {keywordTypes} = Parser.acorn;
    keywordTypes.freeze = new TokenType('freeze', {
        keyword: 'freeze',
    });
    
    return class extends Parser {
        parse() {
            this.keywords = addKeyword('freeze', this.keywords);
            return super.parse();
        }
        parseStatement(context, topLevel, exports) {
            if (this.type === keywordTypes.freeze) {
                return this.parseFreeze();
            }
            
            return super.parseStatement(context, topLevel, exports);
        }
        
        parseFreeze() {
            this.next();
            
            const node = super.startNode();
            const expression = this.parseExpression();
            
            if (isObjectExpression(expression) || isArrayExpression(expression))
                node.expression = {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "Object"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "freeze"
                            },
                            "computed": false
                        },
                        "arguments": [
                            expression
                        ]
                    }
                }
                
            else
                this.raise(this.start, `After 'freeze' only objects and arrays can come`);
            
            return super.finishNode(node, 'ExpressionStatement');
        }
    };
}

