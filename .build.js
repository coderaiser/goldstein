import * as esbuild from 'esbuild';
import {nodeBuiltIns} from 'esbuild-node-builtins';

await esbuild.build({
    entryPoints: ['packages/goldstein/parser.js'],
    bundle: true,
    outfile: 'build/parser.cjs',
    format: 'cjs',
    mainFields: ['main'],
    plugins: [nodeBuiltIns()],
    external: [
        'tenko',
        'hermes-parser',
        'acorn-stage3',
        'estree-to-babel',
        'putout',
    ],
});
