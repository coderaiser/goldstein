const [arg] = process.argv.slice(2);
import esbuild from 'esbuild';
import {
    readFileSync,
    writeFileSync,
    unlinkSync,
} from 'fs';
import {compile} from '../packages/goldstein/index.js';

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
    bundle: true,
    write: true,
    outfile,
    platform: 'neutral',
});

unlinkSync(compiledName);
