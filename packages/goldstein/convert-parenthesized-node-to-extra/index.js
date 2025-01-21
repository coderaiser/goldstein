const {assign} = Object;

export const report = () => `Use 'node.extra' instead of 'ParenthesizedExpression'`;

export const fix = (path) => {
    const {expression} = path.node;
    
    assign(expression, {
        extra: {
            parenthesized: true,
        },
    });
    path.replaceWith(expression);
};

export const include = () => [
    'ParenthesizedExpression',
];
