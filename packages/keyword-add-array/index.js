import {types} from 'putout';
import {tokTypes as tt} from 'acorn';
import {DestructuringErrors} from '../operator/index.js';

const {assign} = Object;

const {
    identifier,
    isArrayExpression,
    memberExpression,
    spreadElement,
} = types;

export default function keywordAddArray(Parser) {
    return class extends Parser {
        parseMaybeAssign(forInit, refDestructuringErrors, afterLeftParse) {
            /* c8 ignore start */
            if (this.isContextual('yield')) {
                if (this.inGenerator)
                    return this.parseYield(forInit);
                
                // The tokenizer will assume an expression is allowed after
                // `yield`, but this isn't that kind of yield
                this.exprAllowed = false;
            }
            /* c8 ignore end */
            
            let ownDestructuringErrors = false;
            let oldParenAssign = -1;
            let oldTrailingComma = -1;
            let oldDoubleProto = -1;
            
            if (refDestructuringErrors) {
                oldParenAssign = refDestructuringErrors.parenthesizedAssign;
                oldTrailingComma = refDestructuringErrors.trailingComma;
                oldDoubleProto = refDestructuringErrors.doubleProto;
                refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
            } else {
                refDestructuringErrors = new DestructuringErrors();
                ownDestructuringErrors = true;
            }
            
            const startPos = this.start;
            const {startLoc} = this;
            
            if (this.type === tt.parenL || this.type === tt.name) {
                this.potentialArrowAt = this.start;
                this.potentialArrowInForAwait = forInit === 'await';
            }
            
            let left = this.parseMaybeConditional(forInit, refDestructuringErrors);
            
            if (afterLeftParse)
                left = afterLeftParse.call(this, left, startPos, startLoc);
            
            if (this.type.isAssign) {
                const node = this.startNodeAt(startPos, startLoc);
                
                node.operator = this.value;
                
                if (this.type === tt.eq)
                    left = this.toAssignable(left, false, refDestructuringErrors);
                
                if (!ownDestructuringErrors)
                    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
                
                if (refDestructuringErrors.shorthandAssign >= left.start)
                    refDestructuringErrors.shorthandAssign = -1;
                
                // reset because shorthand default was used correctly
                if (this.type === tt.eq)
                    this.checkLValPattern(left);
                else
                    this.checkLValSimple(left);
                
                node.left = left;
                this.next();
                node.right = this.parseMaybeAssign(forInit);
                
                if (oldDoubleProto > -1)
                    refDestructuringErrors.doubleProto = oldDoubleProto;
                
                if (node.operator === '+=' && isArrayExpression(node.right))
                    return createAppendNode(this, node);
                
                return this.finishNode(node, 'AssignmentExpression');
            }
            
            if (ownDestructuringErrors)
                this.checkExpressionErrors(refDestructuringErrors, true);
            
            if (oldParenAssign > -1)
                refDestructuringErrors.parenthesizedAssign = oldParenAssign;
            
            if (oldTrailingComma > -1)
                refDestructuringErrors.trailingComma = oldTrailingComma;
            
            return left;
        }
    };
}

function createAppendNode(context, node) {
    const {left, right} = node;
    
    assign(node, {
        callee: memberExpression(left, identifier('push')),
        arguments: [spreadElement(right)],
    });
    
    return context.finishNode(node, 'CallExpression');
}
