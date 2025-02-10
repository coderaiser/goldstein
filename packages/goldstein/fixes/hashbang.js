export const fixHashbang = (ast) => {
    const {comments} = ast;
    
    if (!comments.length)
        return;
    
    const {value} = comments[0];
    
    if (value === '/usr/bin/env node')
        ast.interpreter = {
            type: 'InterpreterDirective',
            value,
        };
};
