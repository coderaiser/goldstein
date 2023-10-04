import {createGoldsteinTry} from '../../types/try.js';

export const report = () => `Use 'try' instead of 'tryCatch/tryToCatch'`;
export const replace = () => ({
    'tryCatch(__args)': createTry({
        async: false,
    }),
    'await tryToCatch(__args)': createTry({
        async: true,
    }),
});

const createTry = ({async}) => ({__args}, path) => {
    const [callee, ...args] = __args;
    
    path.node.goldstein = createGoldsteinTry({
        async,
        callee,
        args,
    });
    
    return path;
};
