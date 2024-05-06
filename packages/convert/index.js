import estreeToBabel from 'estree-to-babel';
import {transform} from 'putout';
import {print} from '../printer/index.js';
import * as removeImportTry from './remove-import-try/index.js';
import * as applyTry from './apply-try/index.js';
import * as addArray from './add-array/index.js';
import * as applyIfLet from './apply-if-let/index.js';
import {fixEmpty, parse} from '../goldstein/index.js';

export const convert = (source) => {
    const ast = estreeToBabel(parse(source));
    
    transform(ast, source, {
        plugins: [
            ['add-array', addArray],
            ['apply-if-let', applyIfLet],
            ['apply-try', applyTry],
            ['remove-import-try', removeImportTry],
        ],
    });
    
    return fixEmpty(print(ast));
};
