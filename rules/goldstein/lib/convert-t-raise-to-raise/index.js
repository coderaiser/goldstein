import {types} from 'putout';
import {transform} from '../transform.js';

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

export const report = () => `Use 'raise()' instead of 't.raise()'`;

export const replace = () => ({
    't.end()': '',
    't.raise(__a, __b)': transform('raise', '__a, __b'),
});
