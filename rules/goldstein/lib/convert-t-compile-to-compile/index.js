import {transform} from '../transform.js';

export const report = () => `Use 'compile()' instead of 't.compile()'`;

export const replace = () => ({
    't.end()': '',
    't.compile(__a)': transform('compile', '__a'),
});
