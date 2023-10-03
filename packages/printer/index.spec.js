import {test} from 'supertape';
import montag from 'montag';
import estreeToBabel from 'estree-to-babel';
import {print} from './index.js';
import {parse} from '../goldstein/index.js';

test('goldstein: printer: try: await', (t) => {
    const source = `const a = try await f('hello')`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        const a = try await f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: try', (t) => {
    const source = `const a = try f('hello')`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        const a = try f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: if', (t) => {
    const source = montag`
        if a > 3 {
            console.log('x');
        }
    `;
    
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        if a > 3 {
            console.log('x');
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: if: else', (t) => {
    const source = montag`
        if a > 3 {
            console.log('x');
        } else {
            console.log('y');
        }
    `;
    
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        if a > 3 {
            console.log('x');
        } else {
            console.log('y');
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});
