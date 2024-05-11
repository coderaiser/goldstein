import {safeAlign} from 'eslint-plugin-putout/config';
import {
    matchToFlat,
    createESLintConfig,
} from '@putout/eslint-flat';

export const match = {
    '**/bin/**': {
        'n/no-unpublished-import': 'off',
    },
};

export default createESLintConfig([safeAlign, matchToFlat(match)]);
