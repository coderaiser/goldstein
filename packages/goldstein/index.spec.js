import {test} from 'supertape';
import montag from 'montag';
import {compile} from './index.js';

test('goldstein: compile', (t) => {
    const result = compile(`
        fn hello() {
        }
    `);
    const expected = 'function hello() {}';
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: guard', (t) => {
    const result = compile(montag`
        fn hello() {
            guard (text !== "world") else {
                return ""
            }
            
            return "Hello " + text
        }
    `);
    const expected = montag`
        function hello() {
            if (!(text !== 'world')) {
                return '';
            }\n
            return 'Hello ' + text;
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: try', (t) => {
    const result = compile(montag`
        try hello(a, b, c);
    `);
    const expected = montag`
        import tryCatch from 'try-catch';
        tryCatch(hello, a, b, c);
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: should', (t) => {
    const result = compile(montag`
        should hello(a, b, c);
    `);
    const expected = montag`
        import tryCatch from 'try-catch';
        tryCatch(hello, a, b, c);
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: freeze', (t) => {
    const result = compile(montag`
        freeze {example: true}
    `);
    const expected = montag`
        const {
            freeze
        } = Object;
        
        freeze({
            example: true
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: sourceType', (t) => {
    const result = compile(montag`
        export fn hello() {};
    `);
    const expected = montag`
        export function hello() {}
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: throw expression', (t) => {
    const result = compile(montag`
        const a = () => throw 'hello';
    `);
    const expected = montag`
        const a = () => throw 'hello';
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: curry', (t) => {
    const result = compile(montag`
        sum~(5);
    `);
    const expected = montag`
        import currify from 'currify';
        currify(sum, 5);
    `;
    
    t.equal(result, expected);
    t.end();
});
