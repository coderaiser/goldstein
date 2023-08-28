import {test} from 'supertape';
import montag from 'montag';
import {
    compile,
    keywords,
    parse,
} from './index.js';

test('goldstein: compile', async (t) => {
    const result = await compile(`
        fn hello() {
        }
    `);
    
    const expected = 'function hello() {}\n';
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: guard', async (t) => {
    const result = await compile(montag`
        fn hello() {
            guard (text !== 'world') else {
                return ''
            }
            
            return 'Hello ' + text
        }
    `);
    
    const expected = montag`
        function hello() {
            if (text === 'world') {
                return '';
            }
            
            return 'Hello ' + text;
        }
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: try', async (t) => {
    const result = await compile(montag`
        try hello(a, b, c);
    `);
    
    const expected = montag`
        import tryCatch from 'try-catch';
        
        tryCatch(hello, a, b, c);
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: should', async (t) => {
    const result = await compile(montag`
        should hello(a, b, c);
    `);
    
    const expected = montag`
        import tryCatch from 'try-catch';
        
        tryCatch(hello, a, b, c);
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: freeze', async (t) => {
    const result = await compile(montag`
        freeze {
            example: true
        }
    `);
    
    const expected = montag`
        const {freeze} = Object;
        
        freeze({
            example: true,
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: sourceType', async (t) => {
    const result = await compile(montag`
        export fn hello() {};
    `);
    
    const expected = montag`
        export function hello() {};
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: throw expression', async (t) => {
    const result = await compile(montag`
        const a = () => throw 'hello';
    `);
    
    const expected = montag`
        const a = () => {
            throw 'hello';
        };
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: curry', async (t) => {
    const result = await compile(montag`
        sum~(5);
    `);
    
    const expected = montag`
        import currify from 'currify';
        
        currify(sum, 5);
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: arrow', async (t) => {
    const result = await compile(montag`
        function hello() => {
        }
    `);
    
    const expected = montag`
        function hello() {}\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: options', async (t) => {
    const source = montag`
        fn hello() {
            return id('hello');
        }
    `;
    
    const {keywordFn} = keywords;
    const result = await compile(source, {
        keywords: [keywordFn],
        rules: {
            declare: ['on', {
                declarations: {
                    id: 'const id = (a) => a',
                },
            }],
        },
    });
    
    const expected = montag`
        const id = (a) => a;
        
        function hello() {
            return id('hello');
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: curry', (t) => {
    const result = parse(montag`
        sum~(5);
    `);
    
    const {expression} = result.body[0];
    
    t.equal(expression.callee.name, 'currify');
    t.end();
});

test('goldstein: parse: if', async (t) => {
    const result = await compile(montag`
        if a > 3 {
            log('hello');
        }
    `);
    
    const expected = montag`
        if (a > 3) {
            log('hello');
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: import', async (t) => {
    const result = await compile(montag`
        import hello from './hello.gs';
    `);
    
    const expected = montag`
        import hello from './hello.js';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

