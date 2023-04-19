import {run} from 'madrun';

export default {
    'test': () => `tape packages/**/*.spec.js`,
    'coverage': async () => `escover ${await run('test')}`,
    'lint': () => `putout .`,
    'fix:lint': () => run('lint', '--fix'),
    'build': () => 'node .build.js',
    'wisdom': () => run(['lint', 'coverage', 'build']),
};
