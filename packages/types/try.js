import {types} from 'putout';

const {
    isAwaitExpression,
    isCallExpression,
} = types;

export function createGoldsteinTry({async, callee, args}) {
    return {
        type: 'TryStatement',
        expression: true,
        async,
        argument: {
            type: 'CallExpression',
            callee,
            arguments: args,
        },
    };
}

export const setGoldsteinTry = (node) => {
    if (!isCallExpression(node) && !isAwaitExpression(node))
        return;
    
    node.goldstein = createGoldsteinTry(parseExpression(node));
};

const parseExpression = (node) => {
    const {argument, arguments: allArgs} = node;
    
    const async = isAwaitExpression(node);
    
    if (!async) {
        const [callee, ...args] = allArgs;
        
        return {
            async,
            args,
            callee,
        };
    }
    
    const [callee, ...args] = argument.arguments;
    
    return {
        async,
        args,
        callee,
    };
};
