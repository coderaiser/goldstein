import {run} from 'madrun';

export default {
    'test': () => `tape 'packages/**/*.spec.js'`,
    'coverage': async () => `c8 ${await run('test')}`,
    'lint': () => `putout .`,
    'fix:lint': () => run('lint', '--fix'),
    'wisdom': () => run(['lint', 'coverage']),
};
