import {test} from 'supertape';
import montag from 'montag';
import tryCatch from 'try-catch';
import {
    compile,
    keywords,
    parse,
    print,
    convert,
} from './index.js';

test('goldstein: compile', (t) => {
    const result = compile(`
        fn hello() {
        }
    `);
    
    const expected = 'function hello() {}\n';
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: guard', (t) => {
    const result = compile(montag`
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

test('goldstein: compile: try await', (t) => {
    const result = compile(montag`
        const [error] = try await hello();
    `);
    
    const expected = montag`
        import tryToCatch from 'try-to-catch';
        
        const [error] = await tryToCatch(hello);
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: operator: safe-assignment', (t) => {
    const result = compile(montag`
        const [error, result] ?= await fetch('xx');
    `);
    
    const expected = montag`
        import tryToCatch from 'try-to-catch';
        
        const [error, result] = await tryToCatch(fetch, 'xx');
    
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

test('goldstein: compile: sourceType', (t) => {
    const result = compile(montag`
        export fn hello() {};
    `);
    
    const expected = montag`
        export function hello() {};
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: throw expression', (t) => {
    const result = compile(montag`
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

test('goldstein: compile: arrow', (t) => {
    const result = compile(montag`
        function hello() => {
        }
    `);
    
    const expected = montag`
        function hello() {}\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: options', (t) => {
    const source = montag`
        fn hello() {
            return id('hello');
        }
    `;
    
    const {keywordFn} = keywords;
    const result = compile(source, {
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
    `, {
        type: 'estree',
    });
    
    const {expression} = result.body[0];
    
    t.equal(expression.callee.name, 'currify');
    t.end();
});

test('goldstein: parse: if', (t) => {
    const result = compile(montag`
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

test('goldstein: parse: append array', (t) => {
    const result = compile(montag`
        const a = [1];
        a += [2, 3];
    `);
    
    const expected = montag`
        const a = [1];
        a.push(...[2, 3]);\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: if let', (t) => {
    const result = compile(montag`
        if let a = b?.c {
            log(a);
        }
    `);
    
    const expected = montag`
        {
            let a = b?.c;
            
            if (a) {
                log(a);
            }
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: import', (t) => {
    const result = compile(montag`
        import hello from './hello.gs';
    `);
    
    const expected = montag`
        import hello from './hello.js';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: assign from', (t) => {
    const result = compile(montag`
        const a = from 'x';
    `);
    
    const expected = montag`
        const a = require('x');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: broken string', (t) => {
    const result = compile(montag`
        const a = 'hello;
        const b = 'world';
    `);
    
    const expected = montag`
        const a = 'hello';
        const b = 'world';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: missing initializer', (t) => {
    const result = compile(montag`
        const {code, places} await samadhi(source);
    `);
    
    const expected = montag`
        const {code, places} = await samadhi(source);\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: import identifier', (t) => {
    const result = compile(montag`
        import hello from hello;
    `);
    
    const expected = montag`
        import hello from 'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: useless comma', (t) => {
    const result = compile(montag`
        const a = {
            b,,
        };
    `);
    
    const expected = montag`
        const a = {
            b,
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: useless comma: class', (t) => {
    const result = compile(montag`
        const a = class {
            b() {},
        };
    `);
    
    const expected = montag`
        const a = class {
            b() {}
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: useless semicolon', (t) => {
    const result = compile(montag`
        const a = {
            b;
        };
    `);
    
    const expected = montag`
        const a = {
            b,
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: ts', (t) => {
    const result = compile(montag`
        const a: string = 'hello';
    `);
    
    const expected = montag`
        const a: string = 'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: jsx', (t) => {
    const result = compile(montag`
        const a = <a>hello</a>;
    `);
    
    const expected = montag`
        const a = (
            <a>hello</a>
        );\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: parse: comment', (t) => {
    const result = compile(montag`
        import hello from './hello.js';
        
        // abc
        const x = 5;
    `);
    
    const expected = montag`
        import hello from './hello.js';
        
        // abc
        const x = 5;\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: print', (t) => {
    const source = `const a = try f('hello');`;
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, `${source}\n`);
    t.end();
});

test('goldstein: convert', (t) => {
    const source = `const a = tryCatch(f, 'hello');`;
    const result = convert(source);
    
    const expected = `const a = try f('hello');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: enable couple keywords', (t) => {
    const source = montag`
        function fn() {}
        
        fn();\n
    `;
    
    const result = compile(source, {
        keywords: {},
    });
    
    t.equal(result, source);
    t.end();
});

test('goldstein: compile: disable keywords', (t) => {
    const source = montag`
        function fn() {}
        
        fn();\n
    `;
    
    const result = compile(source, {
        keywords: {
            ...keywords,
            keywordFn: false,
        },
    });
    
    t.equal(result, source);
    t.end();
});

test('goldstein: compile: new line before if', (t) => {
    const source = montag`
            const keyPath = path.get('key');
            
            if (keyPath.isIdentifier() && !keyPath.node.name)
                push(path);
    `;
    
    const result = compile(source, {
        keywords: {
            ...keywords,
            keywordFn: false,
        },
    });
    
    const expected = montag`
        const keyPath = path.get('key');
        
        if (keyPath.isIdentifier() && !keyPath.node.name)
            push(path);\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: parse-maybe-array', (t) => {
    const source = montag`
        a += [1];
    `;
    
    const [error] = tryCatch(compile, source, {
        keywords: {
            keywordAddArray: false,
        },
    });
    
    t.equal(error.message, `☝️Looks like 'keyword-add-array' is missing.`);
    t.end();
});

test('goldstein: compile: missing comma', (t) => {
    const source = montag`
        const {
            isCallExpression
            isAwaitExpression
        } = types;
        
        class X extends Parser {
            parseExprAtom() {
                if (this.type === x)
                    return parseTryStatement();
            }
        };
    `;
    
    const {
        keywordUselessSemicolon,
        keywordUselessComma,
    } = keywords;
    
    const result = compile(source, {
        keywords: {
            keywordUselessComma,
            keywordUselessSemicolon,
        },
    });
    
    const expected = montag`
        const {
            isCallExpression,
            isAwaitExpression,
        } = types;
        
        class X extends Parser {
            parseExprAtom() {
                if (this.type === x)
                    return parseTryStatement();
            }
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: compile: export-no-const', (t) => {
    const source = montag`
        export x = () => {};
    `;
    
    const result = compile(source);
    const expected = montag`
        export const x = () => {};\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('goldstein: wrong brace', (t) => {
    const result = compile(montag`
        import a from 'a');
    `);
    
    const expected = montag`
        import a from 'a';
    
    `;
    
    t.equal(result, expected);
    t.end();
});
