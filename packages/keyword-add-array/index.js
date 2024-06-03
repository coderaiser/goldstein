import {types} from 'putout';
import {parseMaybeAssign} from '../internal-parse-maybe-assign/index.js';

const {assign} = Object;

const {
    identifier,
    memberExpression,
    spreadElement,
} = types;

export default function keywordAddArray(Parser) {
    return class extends Parser {
        parseMaybeAssign(forInit, refDestructuringErrors, afterLeftParse) {
            return parseMaybeAssign.call(this, forInit, refDestructuringErrors, afterLeftParse);
        }
        
        goldsteinCreateAddArray(node) {
            const {left, right} = node;
            
            assign(node, {
                callee: memberExpression(left, identifier('push')),
                arguments: [spreadElement(right)],
            });
            
            return this.finishNode(node, 'CallExpression');
        }
    };
}
