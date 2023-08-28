import {types} from 'putout';
import {transform} from '../transform.js';

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

export const report = () => `Use 'compile()' instead of 't.compile()'`;

export const replace = () => ({
    't.end()': '',
    't.compile(__a)': transform('compile', '__a'),
});
