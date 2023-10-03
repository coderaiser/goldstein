import {createGoldsteinTry} from '../../keyword-try/index.js';

export const report = () => `Use 'try' instead of 'tryCatch/tryToCatch'`;
export const replace = () => ({
    'tryCatch(__args)': createTry({
        awaitType: false,
    }),
    'await tryToCatch(__args)': createTry({
        awaitType: true,
    }),
});

const createTry = ({awaitType}) => ({__args}, path) => {
    const [callee, ...args] = __args;
    
    path.node.goldstein = createGoldsteinTry({
        await: awaitType,
        callee,
        args,
    });
    
    return path;
};
