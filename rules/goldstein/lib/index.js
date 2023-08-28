import * as convertTCompileToCompile from './convert-t-compile-to-compile/index.js';
import * as convertTRaiseToRaise from './convert-t-raise-to-raise/index.js';

export const rules = {
    'convert-t-compile-to-compile': convertTCompileToCompile,
    'convert-t-raise-to-raise': convertTRaiseToRaise,
};
