import {test} from 'supertape';
import montag from 'montag';
import {estreeToBabel} from 'estree-to-babel';
import {print} from '../index.js';
import {parse} from '../../goldstein/index.js';

test('goldstein: printer: visitors: await', (t) => {
    const source = `const a = await f('hello')`;
    const ast = estreeToBabel(parse(source));
    const result = print(ast);
    
    const expected = montag`
        const a = await f('hello');\n
    `;
    
    t.equal(result, expected);
    t.end();
});
