#!/usr/bin/env node

import esbuild from 'esbuild';
import {
    readFileSync,
    writeFileSync,
    unlinkSync,
} from 'node:fs';
import process from 'node:process';
import {compile} from '../packages/goldstein/index.js';

const [arg] = process.argv.slice(2);

if (!arg) {
    console.log('gs <filename>');
    process.exit();
}

const source = readFileSync(arg, 'utf8');
const compiled = compile(source);
const compiledName = `~${arg.replace(/\.gs$/, '.js')}`;

writeFileSync(compiledName, compiled);

const outfile = compiledName.replace('~', '');

esbuild.buildSync({
    entryPoints: [compiledName],
    bundle: false,
    write: true,
    outfile,
    mainFields: ['main'],
});

unlinkSync(compiledName);
