import {Parser} from 'acorn';

export const extendParser = (keywords) => {
    const parser = Parser.extend(
        ...keywords,
    );
    
    const parse = createParse(parser);
    
    return {
        parse,
    };
};

const createParse = (parser) => (a) => parser.parse(a, {
    ecmaVersion: 'latest',
    sourceType: 'module',
});
