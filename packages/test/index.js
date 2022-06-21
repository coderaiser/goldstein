import {
    readFileSync,
    writeFileSync,
} from 'fs';
import {fileURLToPath} from 'url';
import {
    dirname,
    join,
} from 'path';

import {extend} from 'supertape';
import {extendParser} from '../parser/index.js';
import {print} from 'putout';

const {stringify} = JSON;
const {UPDATE, AST} = process.env;

export const createTest = (url, ...keywords) => {
    const filename = fileURLToPath(url);
    const dir = dirname(filename);
    
    const parser = extendParser(keywords);
    
    return extend({
        compile: compile({
            dir,
            parser,
        }),
    });
};

const compile = ({dir, parser}) => (t) => (name) => {
    const from = join(dir, 'fixture', `${name}.gs`);
    const to = join(dir, 'fixture', `${name}.js`);
    const fromData = readFileSync(from, 'utf8');
    const toData = readFileSync(to, 'utf8');
    
    const ast = parser.parse(fromData);
    
    if (AST === '1')
        process.stdout.write(stringify(ast, null, 4));
    
    const result = print(ast);
    
    if (UPDATE === '1')
        writeFileSync(to, result);
    
    return t.equal(result, toData);
};

