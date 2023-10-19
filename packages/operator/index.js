export * from 'acorn';
export * from './scopeflags.js';
export function addKeyword(keyword, keywords) {
    const str = keywords
        .toString()
        .replace(')$', `|${keyword})$`)
        .slice(1, -1);
    
    return RegExp(str);
}

export class DestructuringErrors {
    shorthandAssign = -1;
    trailingComma = -1;
    parenthesizedAssign = -1;
    parenthesizedBind = -1;
    doubleProto = -1;
}
