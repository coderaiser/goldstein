import {test} from 'supertape';
import montag from 'montag';
import {convert} from './index.js';

test('goldstein: convert: tryCatch', (t) => {
    const source = `const a = await tryToCatch(f, 'hello')`;
    const result = convert(source);
    
    const expected = montag`
        const a = try await f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: convert: tryCatch: import', (t) => {
    const source = `
        import tryCatch from 'try-catch';
        const a = tryCatch(f, 'hello')
    `;
    
    const result = convert(source);
    
    const expected = montag`
        const a = try f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});
