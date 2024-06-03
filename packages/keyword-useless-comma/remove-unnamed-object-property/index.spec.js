import {test} from 'supertape';
import montag from 'montag';
import {transform} from 'putout';
import * as removeUnnamedIdentifier from './index.js';
import {parse, print} from '../../goldstein/index.js';
import keywordUselessComma from '../index.js';

test('goldstein: keyword: useless-comma: remove-unnamed-object-property', (t) => {
    const source = montag`
        const a = {
            b,,
        };
    `;
    
    const ast = parse(source, {
        keywords: [
            keywordUselessComma,
        ],
    });
    
    transform(ast, source, {
        plugins: [
            ['remove', removeUnnamedIdentifier],
        ],
    });
    
    const code = print(ast);
    
    const expected = montag`
       const a = {
           b,
       };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('goldstein: keyword: useless-comma: remove-unnamed-object-property: StringLiteral', (t) => {
    const source = montag`
        const a = {
            "hello": "world",,
        };
    `;
    
    const ast = parse(source, {
        keywords: [
            keywordUselessComma,
        ],
    });
    
    transform(ast, source, {
        plugins: [
            ['rename', removeUnnamedIdentifier],
        ],
    });
    
    const code = print(ast);
    
    const expected = montag`
       const a = {
           'hello': 'world',
       };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('goldstein: keyword: useless-comma: remove-unnamed-class-property', (t) => {
    const source = montag`
        const a = class {
            b() {},
            c() {},
        };
    `;
    
    const ast = parse(source, {
        keywords: [
            keywordUselessComma,
        ],
    });
    
    transform(ast, source, {
        plugins: [
            ['remove', removeUnnamedIdentifier],
        ],
    });
    
    const code = print(ast);
    
    const expected = montag`
       const a = class {
           b() {}
           
           c() {}
       };\n
    `;
    
    t.equal(code, expected);
    t.end();
});
