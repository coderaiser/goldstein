import {transform} from '../transform.js';

export const report = () => `Use 'raise()' instead of 't.raise()'`;

export const replace = () => ({
    't.end()': '',
    't.raise(__a, __b)': transform('raise', '__a, __b'),
});
