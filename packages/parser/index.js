import {Parser} from 'acorn';

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
        onComment: (a) => {
            comments.push(a);
        },
    };
    
    const result = parser.parse(source, options);
    const tokens = Array.from(parser.tokenizer(source, options));
    
    return {
        ...result,
        tokens,
        comments,
    };
};
