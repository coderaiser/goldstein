import {Parser} from 'acorn';
import {attachComments} from 'estree-util-attach-comments';

export const extendParser = (keywords) => {
    const parser = Parser.extend(...keywords);
    const parse = createParse(parser);
    
    return {
        parse,
    };
};

const createParse = (parser) => (source) => {
    const comments = [];
    const options = {
        ecmaVersion: 'latest',
        sourceType: 'module',
        locations: true,
        comment: true,
        ranges: true,
        onComment: comments,
        preserveParens: true,
        allowHashBang: true,
    };
    
    const ast = parser.parse(source, options);
    
    attachComments(ast, comments);
    
    return {
        ...ast,
        tokens: Array.from(parser.tokenizer(source, options)),
        comments,
    };
};
