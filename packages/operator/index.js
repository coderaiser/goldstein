export * from 'acorn';
export * from './scopeflags.js';
export function addKeyword(keyword, keywords) {
    const str = keywords
        .toString()
        .replace(')$', `|${keyword})$`)
        .slice(1, -1);
    
    return RegExp(str);
}

