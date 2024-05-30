import {test} from 'supertape';
import montag from 'montag';
import {transform} from 'putout';
import * as renameUnnamedIdentifier from './index.js';
import {parse, print} from '../../goldstein/index.js';
import keywordUselessComma from '../index.js';

test('goldstein: keyword: useless-comma: rename-unnamed-identifier', (t) => {
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
            ['rename', renameUnnamedIdentifier],
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

