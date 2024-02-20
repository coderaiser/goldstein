import {test} from 'supertape';
import montag from 'montag';
import estreeToBabel from 'estree-to-babel';
import {print} from '../index.js';
import {parse} from '../../goldstein/index.js';

test('goldstein: printer: visitors: try: await', (t) => {
    const source = `const a = try await f('hello')`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        const a = try await f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: visitors: try', (t) => {
    const source = `const a = try f('hello')`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        const a = try f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: visitors: try-catch', (t) => {
    const source = `try {} catch {}`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = 'try {} catch {}\n';
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: printer: visitors: try catch', (t) => {
    const source = `try {} catch {}`;
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, `${source}\n`);
    t.end();
});
